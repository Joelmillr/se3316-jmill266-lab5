import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Schedule } from 'src/app/layout/schedules/schedule.model';
import { SchedulesService } from 'src/app/services/schedules.service';

@Component({
  selector: 'app-edit-schedules',
  templateUrl: './edit-schedules.component.html',
  styleUrls: ['./edit-schedules.component.css']
})
export class EditSchedulesComponent implements OnInit,OnDestroy {
  @Input() userID!:String;
  userSchedules: Schedule[] = []
  private scheduleSub!: Subscription

  constructor(public scheduleService: SchedulesService ) { }

  ngOnInit(): void {
    this.scheduleSub = this.scheduleService.getUserScheduleListListener().subscribe((schedules:Schedule[]) => {
      this.userSchedules = schedules
    });
  }

  ngOnDestroy() {
    this.scheduleSub.unsubscribe()
  }


}
