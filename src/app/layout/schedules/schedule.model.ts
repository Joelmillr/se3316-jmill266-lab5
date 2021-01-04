import {CourseList} from './courseList.model'

export interface Schedule {
  "_id": any;
  "public": Boolean;
  "title": String;
  "description": String;
  "creatorEmail": String;
  "creator": String;
  "courseList": [CourseList];
  "createdAt": any;
  "updatedAt": any;
  "__v": any;
}
