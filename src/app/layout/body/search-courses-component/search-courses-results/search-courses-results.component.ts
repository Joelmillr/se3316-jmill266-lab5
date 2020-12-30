import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/app/layout/courses/course.model';

@Component({
  selector: 'app-search-courses-results',
  templateUrl: './search-courses-results.component.html',
  styleUrls: ['./search-courses-results.component.css']
})
export class SearchCoursesResultsComponent implements OnInit {
  @Input() courses!:Course[]

  constructor() { }

  ngOnInit(): void {
    
  }

}
