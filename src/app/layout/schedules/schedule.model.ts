import {CourseList} from './courseList.model'

export interface Schedule {
  "_id": any;
  "public": Boolean;
  "title": String;
  "description": String;
  "creatorID": String;
  "courseList": [CourseList]
}
