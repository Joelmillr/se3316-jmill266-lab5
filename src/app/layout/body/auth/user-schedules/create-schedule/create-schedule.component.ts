import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from 'src/app/layout/schedules/schedule.model';
import { SchedulesService } from 'src/app/services/schedules.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  createSchedule: boolean = false;
  scheduleName: String = "";
  scheduleDescription: String = ""
  public: boolean = false
  @Input()creatorID!: String;

  constructor(public scheduleService: SchedulesService) { }

  ngOnInit(): void {
  }

  onOpenCreator() {
    this.createSchedule = true;
  }

  onCreateSchedule() {
    if(this.scheduleName == undefined || this.scheduleName == "") {
      alert(`Please enter a schedule name!`)
    }else{
      if(this.scheduleDescription == undefined) this.scheduleDescription = "";
      const schedule = {
        "title": this.scheduleName,
        "creatorID": this.creatorID,
        "description": this.scheduleDescription,
        "public": this.public
      }
      this.scheduleService.createSchedule(this.scheduleName, schedule).subscribe(schedule => {
        alert(`${schedule.title} was created`)
      }, error => {
        alert(`Error Creating Schedule! Please ensure that you do not reuse a schedule name`)
      })
    }
  }

  onHideScheduleCreate() {
    this.createSchedule = false
  }

}
