import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Schedule } from '../layout/schedules/schedule.model';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  scheduleURL:string = 'http://localhost:3000/api/schedules';
  private schedule!: Schedule;
  private schedules: Schedule[] = []

  private userScheduleList = new Subject<Schedule[]>();

  private publicScheduleList = new Subject<Schedule[]>();

  constructor(private http: HttpClient){

  }

  getUserSchedules(userID: String){
    this.http.get<Schedule[]>(`${this.scheduleURL}/user/${userID}`)
    .subscribe((userSchedules) => {
      this.schedules = userSchedules;
      this.userScheduleList.next([...this.schedules]);
    })
  }

  getPublicSchedules(){
    this.http.get<Schedule[]>(`${this.scheduleURL}`)
    .subscribe((publicSchedules) => {
      this.schedules = publicSchedules;
      this.publicScheduleList.next([...this.schedules]);
    })
  }

  //creating a new schedule
  createSchedule(scheduleName: String, schedule: any) {
    return this.http.post<Schedule>(`${this.scheduleURL}/createSchedule/${scheduleName}`, schedule)
  }



  //add course or remove course from schedule
  updateSchedule(addCourse: boolean, scheduleID: String, creatorID: String, courseID:String){
    // If addCourse is true -> add a course to the schedule
    if(addCourse){
      const requestBody = {
        "creatorID": `${creatorID}`,
        "courseID": `${courseID}`
      }
      return this.http.put<Schedule>(`${this.scheduleURL}/editSchedule/${scheduleID}`, requestBody)
    }
    
    // If addCourse is false -> remove a course from the schedule
    else {
      return this.http.delete<Schedule>(`${this.scheduleURL}/editSchedule/${courseID}/from/${scheduleID}`, )
    }
  }

  getUserScheduleListListener(){
    return this.userScheduleList.asObservable();
  }
}
