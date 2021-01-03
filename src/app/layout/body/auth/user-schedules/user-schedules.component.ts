import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { EditSchedulesComponent } from './edit-schedules/edit-schedules.component';

@Component({
  selector: 'app-user-schedules',
  templateUrl: './user-schedules.component.html',
  styleUrls: ['./user-schedules.component.css']
})
export class UserSchedulesComponent implements OnInit {
  userID: String = "123";
  @ViewChild(EditSchedulesComponent) editSchedules!:EditSchedulesComponent;
  courseMongoIdList: any[] = [];
  subjectList: any[] = [];
  catalog_nbrList: any[] = [];

  constructor(public courseService:CoursesService) {
    courseService.getSubjectAndCatalog_nbrList().subscribe(courseList => {
      courseList.forEach(course => {
        this.courseMongoIdList.push(course._id)
        this.subjectList.push(course.subject)
        this.catalog_nbrList.push(course.catalog_nbr)
      })
    })
  }

  ngOnInit(): void {
  }

  scheduleCreated(){
    this.editSchedules.updateScheduleList()
  }

}
