import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
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

}
