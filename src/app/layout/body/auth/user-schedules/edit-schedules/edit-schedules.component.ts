import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Schedule } from 'src/app/layout/schedules/schedule.model';
import { SchedulesService } from 'src/app/services/schedules.service';

@Component({
  selector: 'app-edit-schedules',
  templateUrl: './edit-schedules.component.html',
  styleUrls: ['./edit-schedules.component.css'],
})
export class EditSchedulesComponent implements OnInit, OnDestroy {
  @Input() userID!: String;
  @Input() courseMongoIdList: any[] = [];
  @Input() subjectList: any[] = [];
  @Input() catalog_nbrList: any[] = [];

  editSchedule: boolean = false;
  userSchedules = [
    {
      _id: 'asjkfhsa',
      public: true,
      title: 'JoelsSched',
      description: "",
      creatorID: '123',
      courseList: [
        {
          subject: 'SE',
          catalog_nbr: '3313',
          course_info: [
            {
              days: ['Tu', 'Th'],
              start_time: '1:30 PM',
              end_time: '2:30 PM',
            },
          ],
        },
        {
          subject: 'SE',
          catalog_nbr: '3316',
          course_info: [
            {
              days: ['M', 'W', 'F'],
              start_time: '8:30 AM',
              end_time: '9:30 AM',
            },
          ],
        },
      ],
    },
    {
      _id: 'sdajfas',
      public: true,
      title: 'Joels2ndSched',
      description: "schedule for 3rd year software eng student",
      creatorID: '123',
      courseList: [
        {
          subject: 'SE',
          catalog_nbr: '3313',
          course_info: [
            {
              days: ['Tu', 'Th'],
              start_time: '2:30 PM',
              end_time: '3:30 PM',
            },
          ],
        },
        {
          subject: 'SE',
          catalog_nbr: '3316',
          course_info: [
            {
              days: ['M', 'W', 'F'],
              start_time: '9:30 AM',
              end_time: '10:30 AM',
            },
          ],
        },
      ],
    },
  ];

  private scheduleSub!: Subscription;

  constructor(public scheduleService: SchedulesService) {}

  ngOnInit(): void {
    //this.scheduleSub = this.scheduleService.getUserScheduleListListener().subscribe((schedules:Schedule[]) => {
    //  this.userSchedules = schedules
    //});
  }

  ngOnDestroy() {
    //this.scheduleSub.unsubscribe();
  }
}
