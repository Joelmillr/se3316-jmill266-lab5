import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { SchedulesService } from 'src/app/services/schedules.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
})
export class TimetableComponent implements OnInit {
  @Input() creatorID: String = '';
  @Input() scheduleID: String = '';
  @Input() courseList: any[] = [];
  @Input() courseMongoIdList: any[] = [];
  @Input() subjectList: any[] = [];
  @Input() catalog_nbrList: any[] = [];

  addCourse: boolean = false;
  subject: String = '';
  catalog_nbr: String = '';

  changeName: boolean = false;
  newScheduleName: String = '';

  changeDescription: boolean = false;
  newScheduleDescription: String = '';

  changeVisibility: boolean = false;
  @Input() isVisible!: any;
  newScheduleVisibility: boolean = false;

  deleteSchedule = false;

  @Output() scheduleListUpdate = new EventEmitter()


  constructor(
    public coursesService: CoursesService,
    public schedulesService: SchedulesService
  ) {}

  ngOnInit(): void {
    this.newScheduleVisibility = this.isVisible;
  }

  onRemoveCourse(subject:String, catalog_nbr:String) {
    // Remove Course
    let courseID!: String;

    // Finding the _id of the desired course
    this.coursesService
      .getCourseID(subject, catalog_nbr)
      .subscribe((course) => {
        // Assigning this _id to a variable
        courseID = course[0]._id;
        // Calling the update schedule function with this variable
        this.schedulesService
          .updateSchedule(false, this.scheduleID, this.creatorID, courseID)
          .subscribe(
            (schedule) => {
              alert(`${schedule.title} was updated`);
              this.scheduleListUpdate.emit()
            },
            (error) => {
              alert(
                `Error Creating Schedule! Please ensure that you do not reuse a schedule name`
              );
            }
          );
      })
  }

  onAddCourse() {
    this.addCourse = true;
  }

  isRealSubject(userInput: String) {
    for (let i = 0; i < this.subjectList.length; i++) {
      if (userInput == this.subjectList[i]) return true;
    }
    return false;
  }

  isRealCatalog_nbr(userInput: String) {
    for (let i = 0; i < this.catalog_nbrList.length; i++) {
      if (userInput == this.catalog_nbrList[i]) return true;
    }
    return false;
  }

  onFinishAddingCourse() {
    if (this.subject == '' || this.subject == undefined) {
      alert(`Please enter a subject`);
    }
    if (this.catalog_nbr == '' || this.catalog_nbr == undefined) {
      alert(`Please enter a course code`);
    }
    if (
      this.isRealSubject(this.subject) &&
      this.isRealCatalog_nbr(this.catalog_nbr)
    ) {
      // Add new course
      let courseID!: String;
      // Finding the _id of the desired course
      this.coursesService
        .getCourseID(this.subject, this.catalog_nbr)
        .subscribe((course) => {
          // Assigning this _id to a variable
          courseID = course[0]._id;
          // Calling the update schedule function with this variable
          this.schedulesService
            .updateSchedule(true, this.scheduleID, this.creatorID, courseID)
            .subscribe(
              (schedule) => {
                alert(`${schedule.title} was updated`);
                this.scheduleListUpdate.emit();
              },
              (error) => {
                alert(
                  `Error Creating Schedule! Please ensure that you do not reuse a schedule name`
                );
              }
            );
        });
    } else {
      alert(
        `${this.subject} ${this.catalog_nbr} is not a real course, please ensure you have entered all fields correct`
      );
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
    this.schedulesService.changeScheduleName(this.scheduleID, {
      newName: this.newScheduleName,
      creatorID: this.creatorID,
    }).subscribe(message => {
      alert(message.message)
      this.scheduleListUpdate.emit();
    });
  }

  onHideChangeName() {
    this.changeName = false;
  }

  onChangeScheduleDescription() {
    this.changeDescription = true;
  }

  onNewDescription() {
    // Change Schedule Description
    this.schedulesService.changeScheduleDescription(this.scheduleID, {
      newDescription: this.newScheduleDescription,
      creatorID: this.creatorID,
    }).subscribe(message => {
      alert(message.message)
      this.scheduleListUpdate.emit();
    });
  }

  onHideChangeDescription() {
    this.changeDescription = false;
  }

  onChangeScheduleVisibility() {
    this.changeVisibility = true;
  }

  onNewVisibility() {
    this.schedulesService.changeScheduleVisibility(this.scheduleID, {
      visibility: this.newScheduleVisibility,
      creatorID: this.creatorID,
    }).subscribe(message => {
      alert(message.message)
      this.scheduleListUpdate.emit();
    });
  }

  onHideChangeVisibility() {
    this.changeVisibility = false;
  }

  onDeleteSchedule() {
    this.deleteSchedule = true;
  }

  onDeleteConfirm() {
    //Delete Schedule
    this.schedulesService.deleteSchedule(this.scheduleID).subscribe(message => {
      alert(message.message)
      this.scheduleListUpdate.emit();
    })
  }

  onHideDeleteSchedule() {
    this.deleteSchedule = false;
  }
}
