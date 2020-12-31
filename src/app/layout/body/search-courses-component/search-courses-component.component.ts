import { Component, OnInit, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Course } from 'src/app/layout/courses/course.model';
import { CoursesService } from '../../../services/courses.service'
import { Observable, Subscription } from 'rxjs'
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-search-courses-component',
  templateUrl: './search-courses-component.component.html',
  styleUrls: ['./search-courses-component.component.css']
})
export class SearchCoursesComponentComponent implements OnInit,OnDestroy {
  @Input() courseMongoIdList: any[] = [];
  @Input() subjectList: any[] = [];
  @Input() catalog_nbrList: any[] = [];

  subject!: any;
  keyword!: any;
  courseList: Course[] = [];
  private courseSub!: Subscription;
  constructor(public courseService:CoursesService) {

  }

  ngOnInit(): void {
    this.courseSub = this.courseService.getCourseListListener().subscribe((courses:Course[]) => {
      this.courseList = courses
    });
    
  }

  ngOnDestroy() {
    this.courseSub.unsubscribe()
  }

  onSearchCourse(){
    if((this.subject == "" && this.keyword == "") || (this.subject == undefined && this.keyword == undefined)){
      alert('Enter subject or keyword')
    }else{
      if((this.subject == "" || this.subject == undefined) && (this.keyword.length > 3)){
        this.courseService.searchCourseByKeyword(this.keyword)
      }
      else if(this.keyword == "" || this.keyword == undefined){
        this.courseService.searchCourseBySubject(this.subject)
      }
      else if(this.keyword.length > 3){
        this.courseService.searchCourseBySubjectAndKeyword(this.subject, this.keyword)
      }
      else{
        alert('Keyword must be at least 4 characters long')
      }
    }
  }

  onShowAllCourses(){
    this.courseService.getCourses()
  }

  onHideCourses(){
    this.courseList = []
  }
}
