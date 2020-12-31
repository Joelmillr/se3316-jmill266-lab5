import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

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
    // Add new course
    if(this.isRealSubject(this.subject) && this.isRealCatalog_nbr(this.catalog_nbr)){
      // Add new course
      this.creatorID
      this.scheduleID
      this.subject
      this.catalog_nbr
      
    }
    else{
      alert(`${this.subject} and ${this.catalog_nbr} are not a real course, please ensure you have entered all fields correctl`)
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
  }

  onHideChangeName() {
    this.changeName = false;
  }

  onChangeScheduleDescription() {
    this.changeDescription = true;
  }

  onNewDescription() {
    // Change Schedule Description
  }

  onHideChangeDescription() {
    this.changeDescription = false;
  }
}
