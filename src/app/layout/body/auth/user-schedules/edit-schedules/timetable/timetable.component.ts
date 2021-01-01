import { Component, Input, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { SchedulesService } from 'src/app/services/schedules.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {
  @Input() creatorID: String = "";
  @Input() scheduleID: String = "";
  @Input() courseList: any[] = [];
  @Input() courseMongoIdList: any[] = [];
  @Input() subjectList: any[] = [];
  @Input() catalog_nbrList: any[] = [];

  addCourse: boolean = false;
  subject: String = "";
  catalog_nbr: String = "";

  changeName: boolean = false;
  newScheduleName: String = "";

  changeDescription:boolean = false;
  newScheduleDescription: String = "";

  constructor(public coursesService:CoursesService, public schedulesService:SchedulesService) { }

  ngOnInit(): void {
  }

  onRemoveCourse(subject:String, catalog_nbr:String) {
    // Remove Course
    alert(`Remove Course: ${subject} ${catalog_nbr} from schedule ${this.scheduleID}`)
  }

  onAddCourse() {
    this.addCourse = true;
  }

  isRealSubject(userInput: String){
    for(let i = 0; i < this.subjectList.length; i++){
      if(userInput == this.subjectList[i]) return true
    }
    return false
  }

  isRealCatalog_nbr(userInput: String){
    for(let i = 0; i < this.catalog_nbrList.length; i++){
      if(userInput == this.catalog_nbrList[i]) return true
    }
    return false
  }

  onFinishAddingCourse() {
    if(this.subject == "" || this.subject == undefined){
      alert(`Please enter a subject`)
    }
     if(this.catalog_nbr == "" || this.catalog_nbr == undefined){
      alert(`Please enter a course code`)
    }
    if(this.isRealSubject(this.subject) && this.isRealCatalog_nbr(this.catalog_nbr)){
      // Add new course
      let courseID!: String;
      // Finding the _id of the desired course
      this.coursesService.getCourseID(this.subject, this.catalog_nbr).subscribe((course) => {
        // Assigning this _id to a variable
        courseID = course[0]._id
        // Calling the update schedule function with this variable
        this.schedulesService.updateSchedule(true, this.scheduleID, this.creatorID, courseID).subscribe(schedule => {
          alert(`${schedule.title} was created`)
        }, error => {
          alert(`Error Creating Schedule! Please ensure that you do not reuse a schedule name`)
        })
      })

    } else{
      alert(`${this.subject} ${this.catalog_nbr} is not a real course, please ensure you have entered all fields correct`)
    }
  }

  onHideAddCourse() {
    this.addCourse = false;
  }

  onChangeScheduleName() {
    this.changeName = true;
  }

  onNewName() {
    // Change Schedule Name
    this.creatorID
    this.scheduleID
    this.newScheduleName
  }

  onHideChangeName() {
    this.changeName = false;
  }

  onChangeScheduleDescription() {
    this.changeDescription = true;
  }

  onNewDescription() {
    // Change Schedule Description
    this.creatorID
    this.scheduleID
    this.newScheduleDescription
  }

  onHideChangeDescription() {
    this.changeDescription = false;
  }
}
