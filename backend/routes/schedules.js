const express = require('express')

const Course = require('../models/course')
const Schedule = require('../models/schedule')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

// Returns all schedules for a specific user
router.get('/user/:userID', checkAuth, (req, res) => {
  const userID = req.params.userID
  Schedule.find({ creatorID: userID }).then(schedules => {
    res.send(schedules)
  })
})

// Create a new schedule (to save a list of courses) with a given schedule name. Return an error if name exists.
router.post('/createSchedule/:scheduleName', checkAuth, (req, res) => {
  Schedule.exists({ title: req.params.scheduleName, creatorID: req.body.creatorID }, (err, result) => {
    if (result) {
      res.status(400).json({
        message: "Schedule already Exists!",
      })
    } else {
      const schedule = new Schedule({
        title: req.params.scheduleName,
        creatorID: req.body.creatorID,
        public: req.body.public,
        description: req.body.description,
        courseList: [],
      })
      schedule.save();
      res.send(schedule)
    }
  })
});

// Change schedule name
router.put('/editSchedule/rename/:scheduleID', checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleID;
  const newName = req.body.newName;
  const creatorID = req.body.creatorID;

  let scheduleName = ""

  Schedule.findById(scheduleID, function (err, result) {
    if (err) {
      return console.log('Error, Schedule does not exist');
    } else {
      scheduleName = result.title
      //if(scheduleName == newName) res.send({message: "Error, Schedule already has this name"})
    }
    })


  Schedule.findByIdAndUpdate(scheduleID, { title: newName },
    function (err, result) {
      if (err) {
        return console.log('error');
      } else {
        res.send({message: "Schedule Updated"})
      }
    });
})

// Change schedule description
router.put('/editSchedule/description/:scheduleID', checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleID;
  const newDescription = req.body.newDescription;
  const creatorID = req.body.creatorID;

  let scheduleDescription = ""

  Schedule.findById(scheduleID, function (err, result) {
    if (err) {
      return console.log('Error, Schedule does not exist');
    } else {
      scheduleDescription = result.description
      //if(scheduleDescription == newDescription) res.send({message: "Error, Schedule already has this description "})
    }
    })


  Schedule.findByIdAndUpdate(scheduleID, { description: newDescription },
    function (err, result) {
      if (err) {
        console.log(err);
        return console.log('error');
      } else {
        console.log(result)
        console.log('Updated schedule');
        res.send({
          message: 'Schedule updated'
        })
      }
    });
})

// Change schedules visibility
router.put(`/editSchedule/visibility/:scheduleID`, checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleID;
  const visibility = req.body.visibility;
  const creatorID = req.body.creatorID;

  let scheduleVisibility = false

  Schedule.findById(scheduleID, function (err, result) {
    if (err) {
      return console.log('Error, Schedule does not exist');
    } else {
      scheduleVisibility = result.public
      //if(scheduleVisibility == visibility) res.send({message: "Error, Schedule already has this visibility "})
    }
    })

  Schedule.findByIdAndUpdate(scheduleID, { public: visibility },
    function (err, result) {
    if (err) {
      console.log(err);
      return console.log('error');
    } else {
      res.send({
        message: 'Schedule updated'
      })
    }
  });
})

// Add a course to the schedule
router.put('/editSchedule/:scheduleId', checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleId
  const creatorID = req.body.creatorID
  const courseID = req.body.courseID

  let addCourse = {
    "subject": "",
    "catalog_nbr": "",
    "course_info": [{
      "days": [],
      "start_time": "",
      "end_time": ""
    }]
  }
  Course.findById(`${courseID}`).then(course => {
    addCourse.subject = course.subject;
    addCourse.catalog_nbr = course.catalog_nbr
    addCourse.course_info[0].days = course.course_info[0].days
    addCourse.course_info[0].start_time = course.course_info[0].start_time
    addCourse.course_info[0].end_time = course.course_info[0].end_time

    Schedule.findByIdAndUpdate(scheduleID, {
      $addToSet: {courseList: addCourse}
    }, function (err, result){
      if (err){
        console.log(err)
        return console.log(err)
      } else {
        //console.log(result)
        //console.log('Updated Schedule')
        res.send(result)
      }
    }
    )
  })
})

// Remove a course from the schedule
router.delete('/editSchedule/:courseID/from/:scheduleId', checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleId
  //const creatorID = req.body.creatorID
  const courseID = req.params.courseID

  let addCourse = {
    "subject": "",
    "catalog_nbr": "",
    "course_info": [{
      "days": [],
      "start_time": "",
      "end_time": ""
    }]
  }
  Course.findById(`${courseID}`).then(course => {
    addCourse.subject = course.subject;
    addCourse.catalog_nbr = course.catalog_nbr
    addCourse.course_info[0].days = course.course_info[0].days
    addCourse.course_info[0].start_time = course.course_info[0].start_time
    addCourse.course_info[0].end_time = course.course_info[0].end_time

    Schedule.findByIdAndUpdate(scheduleID, {
      $pull: {courseList: addCourse}
    }, function (err, result){
      if (err){
        console.log(err)
        return console.log(err)
      } else {
        //console.log(result)
        //console.log('Updated Schedule')
        res.send(result)
      }
    }
    )
  })
})

// Delete a schedule
router.delete('/editSchedule/delete/:scheduleId', checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleId

  Schedule.findByIdAndDelete(scheduleID, function(err, result){
    res.send({message:"schedule deleted"})
  })
})

// returns a list of all public schedules
router.get('', (req, res) => {
  Schedule.find({ public: true }).limit(10).then(scheduleList => {
    res.send(scheduleList)
  })
})

module.exports = router
