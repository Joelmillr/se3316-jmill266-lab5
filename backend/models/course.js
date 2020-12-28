const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  "_id": String,
  "catalog_nbr": String,
  "subject": String,
  "className": String,
  "course_info": [{
    "class_nbr": String,
    "start_time": String,
    "descrlong": String,
    "end_time": String,
    "campus": String,
    "facility_ID": String,
    "days": [String],
    "instructors": [String],
    "class_section": String,
    "ssr_component": String,
    "enrl_stat": String,
    "descr": String,
  }],
  "catalog_description": String,
}, {collection: 'Courses'})

module.exports = mongoose.model('Course', courseSchema);
