import { CourseInfo } from './course-info.model'

export interface Course {
  "_id": any;
  "catalog_nbr": any;
  "subject": any;
  "className": any;
  "course_info": CourseInfo[];
  "catalog_description": any;
}
