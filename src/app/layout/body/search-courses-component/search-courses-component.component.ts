import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Course } from 'src/app/layout/courses/course.model';
import { CoursesService } from '../../../services/courses.service'
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-search-courses-component',
  templateUrl: './search-courses-component.component.html',
  styleUrls: ['./search-courses-component.component.css']
})
export class SearchCoursesComponentComponent implements OnInit,OnDestroy {
  subject!: any;
  keyword!: any;
  courseMongoIdList: any[] = [];
  catalog_nbrList: any[] = [];
  classNameList: any[] = [];
  courseList: Course[] = [];
  private courseSub!: Subscription;

  constructor(public courseService:CoursesService) {
    courseService.getClassNameAndCatalog_nbrList().subscribe(courseList => {
      courseList.forEach(course => {
        this.courseMongoIdList.push(course._id)
        this.classNameList.push(course.className)
        this.catalog_nbrList.push(course.catalog_nbr)
      })
    })
    console.log(this.courseMongoIdList)
    console.log(this.classNameList)
    console.log(this.catalog_nbrList)
  }

  ngOnInit(): void {
    //this.courseList = this.courseService.getCourses();
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
