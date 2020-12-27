import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Course } from '../layout/courses/course.model'
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  coursesURL:string = 'http://localhost:3000/api/courses';
  private courses: Course[] = [];
  private coursesUpdated = new Subject<Course[]>();

  constructor(private http: HttpClient) { }

  // return all courses
  getCourses() {
    this.http.get<Course[]>(`${this.coursesURL}`)
    .subscribe((courseList) => {
      this.courses = courseList;
      this.coursesUpdated.next([...this.courses]);
    })
  }

  // search for a course
  //searchSubjects(subject: any):Observable<SubjectSeachCourse[]>{
    //return this.http.get<SubjectSeachCourse[]>(`${this.coursesURL}/available/${subject}`)
  //}

  searchCourseCodes(subject:any, courseCode:any):Observable<Course> {
    return this.http.get<Course>(`${this.coursesURL}/available/${subject}/${courseCode}`)
  }
}
