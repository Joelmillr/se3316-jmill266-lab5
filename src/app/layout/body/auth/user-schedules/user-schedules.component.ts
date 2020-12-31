import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-schedules',
  templateUrl: './user-schedules.component.html',
  styleUrls: ['./user-schedules.component.css']
})
export class UserSchedulesComponent implements OnInit {
  userID: String = "123";
  @Input() courseMongoIdList: any[] = [];
  @Input() subjectList: any[] = [];
  @Input() catalog_nbrList: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
