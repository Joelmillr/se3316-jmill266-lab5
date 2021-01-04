import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';
import { AuthServiceService } from '../auth-service.service';
import { EditSchedulesComponent } from './edit-schedules/edit-schedules.component';

@Component({
  selector: 'app-user-schedules',
  templateUrl: './user-schedules.component.html',
  styleUrls: ['./user-schedules.component.css']
})
export class UserSchedulesComponent implements OnInit, OnDestroy {
  userEmail: String = "";
  @ViewChild(EditSchedulesComponent) editSchedules!:EditSchedulesComponent;
  courseMongoIdList: any[] = [];
  subjectList: any[] = [];
  catalog_nbrList: any[] = [];

  public isAuth: boolean = false
  private authStatusSub!: Subscription;

  constructor(public courseService:CoursesService, private authService: AuthServiceService) {
    courseService.getSubjectAndCatalog_nbrList().subscribe(courseList => {
      courseList.forEach(course => {
        this.courseMongoIdList.push(course._id)
        this.subjectList.push(course.subject)
        this.catalog_nbrList.push(course.catalog_nbr)
      })
    })
  }

  getUserEmail() {
    if(this.isAuth){
      this.userEmail = this.authService.getEmail();
    }
  }

  ngOnInit(): void {
    this.isAuth = this.authService.getIsAuth()
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated
      if(this.isAuth) this.getUserEmail
    })
  }

  scheduleCreated(){
    this.editSchedules.updateScheduleList()
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
