import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Course } from '../layout/courses/course.model'
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursesURL:string = 'http://localhost:3000/api/courses';
  private courses: Course[] = [];

  private courseList = new Subject<Course[]>();

  constructor(private http: HttpClient) {

  }

  getSubjectAndCatalog_nbrList() {
    return this.http.get<Course[]>(`${this.coursesURL}/subject_and_catalog_nbrs`)
  }

  // return all courses
  getCourses(coursesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${coursesPerPage}&page=${currentPage}`
    this.http.get<Course[]>(`${this.coursesURL}` + queryParams)
    .subscribe((allCourses) => {
      this.courses = allCourses;
      this.courseList.next([...this.courses]);
    })
  }

  // search for a course by subject
  searchCourseBySubject(subject: any) {
    this.http.get<Course[]>(`${this.coursesURL}/subjects/${subject}`)
    .subscribe((allCourses) => {
      this.courses = allCourses;
      this.courseList.next([...this.courses]);
    })
  }

  // search for a course by keyword
  searchCourseByKeyword(keyword:any) {
    this.http.get<Course[]>(`${this.coursesURL}/keywords/${keyword}`)
    .subscribe((allCourses) => {
      this.courses = allCourses;
      this.courseList.next([...this.courses]);
    })
  }

  // search for a course by subject and course code
  searchCourseBySubjectAndKeyword(subject:any, keyword:any) {
    this.http.get<Course[]>(`${this.coursesURL}/subject_and_keyword/${subject}/${keyword}`)
    .subscribe((allCourses) => {
      this.courses = allCourses;
      this.courseList.next([...this.courses]);
    })
  }

  // Returns the course ID for a given subject + catalog_nbr
  getCourseID(subject:String, catalog_nbr:String){
    let courseID: String = ""
    return this.http.get<Course[]>(`${this.coursesURL}/code/${subject}/${catalog_nbr}`)
  }

  getCourseListListener(){
    return this.courseList.asObservable();
  }
}
