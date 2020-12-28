const mongoose = require('mongoose');
const joi = require('joi');

const scheduleSchema = mongoose.Schema({
  "title": joi.string().regex(/^[^*|\":<>[\]{}`\\()';@&$?!]+$/).min(1).required(), //only a-z, A-Z, 0-9. No spaces allowed either.,,
  "creator": joi.string().regex(/^[^*|\":<>[\]{}`\\()';@&$?!]+$/).min(1).required(), //only a-z, A-Z, 0-9. No spaces allowed either.,,
  "courseList":[{
    "subject": joi.string().regex(/^[^*|\":<>[\]{}`\\()';@&$?!]+$/).min(1).required(), //only a-z, A-Z, 0-9. No spaces allowed either.,,
    "catalog_nbr": joi.string().regex(/^[^*|\":<>[\]{}`\\()';@&$?!]+$/).min(1).required(), //only a-z, A-Z, 0-9. No spaces allowed either.,,
    "course_info": [{
      "days": [String],
      "start_time": String,
      "end_time": String,
    }],
  }],
  "public": {type: Boolean, default: false}
})

module.exports = mongoose.model('Schedule', scheduleSchema);
