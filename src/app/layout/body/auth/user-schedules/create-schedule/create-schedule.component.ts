import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SchedulesService } from 'src/app/services/schedules.service';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css'],
})
export class CreateScheduleComponent implements OnInit, OnDestroy {
  createSchedule: boolean = false;
  scheduleName: String = '';
  scheduleDescription: String = '';
  public: boolean = false;
  creatorEmail!: String;

  @Output() scheduleCreated = new EventEmitter();

  public isAuth: boolean = false;
  private authStatusSub!: Subscription;

  constructor(
    public scheduleService: SchedulesService,
    private authService: AuthServiceService
  ) {}

  getUserEmail() {
    if (this.isAuth) {
      this.creatorEmail = this.authService.getEmail();
    }
  }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    if (this.isAuth) {
      this.creatorEmail = this.authService.getEmail();
    }
  }

  ngOnDestroy() {
    if (this.isAuth) {
      this.authStatusSub.unsubscribe();
    }
  }

  onOpenCreator() {
    this.createSchedule = true;
  }

  onCreateSchedule() {
    if (this.scheduleName == undefined || this.scheduleName == '') {
      alert(`Please enter a schedule name!`);
    } else {
      if (this.scheduleDescription == undefined) this.scheduleDescription = '';
      const schedule = {
        title: this.scheduleName,
        creatorID: this.creatorEmail,
        description: this.scheduleDescription,
        public: this.public,
      };
      this.scheduleService
        .createSchedule(this.scheduleName, schedule)
        .subscribe(
          (schedule) => {
            alert(`${schedule.title} was created`);
            this.scheduleCreated.emit();
          },
          (error) => {
            alert(
              `Error Creating Schedule! Please ensure that you do not reuse a schedule name`
            );
          }
        );
      this.scheduleService.getUserSchedules(this.creatorEmail);
    }
  }

  onHideScheduleCreate() {
    this.createSchedule = false;
  }
}
