import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-courses-component',
  templateUrl: './search-courses-component.component.html',
  styleUrls: ['./search-courses-component.component.css']
})
export class SearchCoursesComponentComponent implements OnInit {
  subject!: any;
  catalog_nbr!: any;

  constructor() { }

  ngOnInit(): void {
  }

  onSearchCourse(){
    alert(this.subject + this.catalog_nbr)
  }

  onShowAllCourses(){
    
  }

}
