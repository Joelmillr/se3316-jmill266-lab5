import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Schedule } from 'src/app/layout/schedules/schedule.model';
import { SchedulesService } from 'src/app/services/schedules.service';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-edit-schedules',
  templateUrl: './edit-schedules.component.html',
  styleUrls: ['./edit-schedules.component.css'],
})
export class EditSchedulesComponent implements OnInit, OnDestroy {
  userEmail!: String;
  @Input() courseMongoIdList: any[] = [];
  @Input() subjectList: any[] = [];
  @Input() catalog_nbrList: any[] = [];

  editSchedule: boolean = false;
  userSchedules: Schedule[] = [];

  isAuth: boolean = false;

  private scheduleSub!: Subscription;

  constructor(
    public scheduleService: SchedulesService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth();
    if (this.isAuth) {
      this.userEmail = this.authService.getEmail()
      this.scheduleService.getUserSchedules(this.userEmail);
      this.scheduleSub = this.scheduleService
        .getUserScheduleListListener()
        .subscribe((schedules: Schedule[]) => {
          this.userSchedules = schedules;
        });
    }
  }

  updateScheduleList() {
    this.scheduleService.getUserSchedules(this.userEmail);
  }

  ngOnDestroy() {
    if(this.isAuth){
      this.scheduleSub.unsubscribe();
    }
  }
}
