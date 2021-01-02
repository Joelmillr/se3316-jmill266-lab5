import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditSchedulesComponent } from './edit-schedules/edit-schedules.component';

@Component({
  selector: 'app-user-schedules',
  templateUrl: './user-schedules.component.html',
  styleUrls: ['./user-schedules.component.css']
})
export class UserSchedulesComponent implements OnInit {
  userID: String = "123";
  @Input() courseMongoIdList: any[] = [];
  @Input() subjectList: any[] = [];
  @Input() catalog_nbrList: any[] = [];
  @ViewChild(EditSchedulesComponent) editSchedules!:EditSchedulesComponent;

  constructor() { }

  ngOnInit(): void {
  }

  scheduleCreated(){
    this.editSchedules.updateScheduleList()
  }

}
