import { Component, OnInit, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Course } from 'src/app/layout/courses/course.model';
import { CoursesService } from '../../../services/courses.service'
import { Observable, Subscription } from 'rxjs'
import {map, startWith} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-search-courses-component',
  templateUrl: './search-courses-component.component.html',
  styleUrls: ['./search-courses-component.component.css']
})
export class SearchCoursesComponentComponent implements OnInit,OnDestroy {
  subject!: any;
  keyword!: any;
  courseList: Course[] = [];

  totalCourses = 739;
  coursesPerPage = 15;
  currentPage = 1;
  pageSizeOptions = [5,10,15,20]

  private courseSub!: Subscription;
  isLoading:boolean = false

  constructor(public courseService:CoursesService) {

  }

  ngOnInit(): void {
    this.courseSub = this.courseService.getCourseListListener().subscribe((courses:Course[]) => {
      this.courseList = courses
      this.isLoading = false
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
        this.isLoading = true
        this.courseService.searchCourseByKeyword(this.keyword)
      }
      else if(this.keyword == "" || this.keyword == undefined){
        this.isLoading = true
        this.courseService.searchCourseBySubject(this.subject)
      }
      else if(this.keyword.length > 3){
        this.isLoading = true
        this.courseService.searchCourseBySubjectAndKeyword(this.subject, this.keyword)
      }
      else{
        alert('Keyword must be at least 4 characters long')
      }
    }
  }

  onShowAllCourses(){
    this.isLoading = true
    this.courseService.getCourses(this.coursesPerPage, this.currentPage)
  }

  onChangedPage(pageData: PageEvent){
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1;
    this.coursesPerPage = pageData.pageSize;
    this.courseService.getCourses(this.coursesPerPage, this.currentPage)
  }

  onHideCourses(){
    this.isLoading = false
    this.courseList = []
  }
}
