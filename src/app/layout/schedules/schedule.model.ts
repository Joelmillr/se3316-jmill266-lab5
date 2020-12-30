import {CourseList} from './courseList.model'

export interface Schedule {
  "_id": any;
  "public": Boolean;
  "title": String;
  "creator": String
  "courseList": [CourseList]
}
