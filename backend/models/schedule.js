const mongoose = require('mongoose');
const joi = require('joi');

const course_infoSchema = mongoose.Schema({
  "days": [String],
    "start_time": String,
    "end_time": String,
}, {_id: false});

const courseListSchema = mongoose.Schema({
  "subject": joi.string().regex(/^[^*|\":<>[\]{}`\\()';@&$?!]+$/).min(1), //only a-z, A-Z, 0-9. No spaces allowed either.,,
  "catalog_nbr": joi.string().regex(/^[^*|\":<>[\]{}`\\()';@&$?!]+$/).min(1), //only a-z, A-Z, 0-9. No spaces allowed either.,,
  "course_info": [course_infoSchema],
},{_id: false});

const scheduleSchema = mongoose.Schema({
  "title": joi.string().regex(/^[^*|\":<>[\]{}`\\()';@&$?!]+$/).min(1).required(), //only a-z, A-Z, 0-9. No spaces allowed either.,,
  "creatorID": joi.string().regex(/^[^*|\":<>[\]{}`\\()';@&$?!]+$/).min(1).required(), //only a-z, A-Z, 0-9. No spaces allowed either.,,
  "courseList":[courseListSchema],
  "public": {type: Boolean, default: false}
}, {collection: 'Schedules'});

module.exports = mongoose.model('Schedule', scheduleSchema);
