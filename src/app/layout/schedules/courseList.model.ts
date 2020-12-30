import {CourseInfo} from './courseInfo.model'

export interface CourseList {
  "subject": String;
  "catalog_nbr": String;
  "course_info": [CourseInfo]
}

