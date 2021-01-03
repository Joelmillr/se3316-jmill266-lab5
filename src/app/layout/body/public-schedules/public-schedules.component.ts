import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SchedulesService } from 'src/app/services/schedules.service';
import { Schedule } from '../../schedules/schedule.model';

@Component({
  selector: 'app-public-schedules',
  templateUrl: './public-schedules.component.html',
  styleUrls: ['./public-schedules.component.css']
})
export class PublicSchedulesComponent implements OnInit, OnDestroy {
  publicSchedules: Schedule[] = []

  private scheduleSub!: Subscription;

  constructor(public scheduleService:SchedulesService) { }

  ngOnInit(): void {
    this.scheduleService.getPublicSchedules()
    this.scheduleSub = this.scheduleService.getPublicScheduleListListener().subscribe((schedules:Schedule[]) => {
      this.publicSchedules = schedules
    });
  }

  ngOnDestroy() {
    this.scheduleSub.unsubscribe();
  }
}
