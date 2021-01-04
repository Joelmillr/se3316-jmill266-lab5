import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from 'src/app/layout/schedules/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Input() courseList: any[] = []
  constructor() { }

  ngOnInit(): void {}

}
