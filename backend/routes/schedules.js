const express = require('express')

const Course = require('../models/course')
const Schedule = require('../models/schedule')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

// Returns all schedules for a specific user
router.get('/user/:userID', checkAuth, (req, res) => {
  const userID = req.userData.userId
  Schedule.find({ creator: userID }).then(schedules => {
    res.send(schedules)
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching schedules failed!'
    })
  })
})

// Create a new schedule (to save a list of courses) with a given schedule name. Return an error if name exists.
router.post('/createSchedule/:scheduleName', checkAuth, (req, res) => {
  Schedule.exists({ title: req.params.scheduleName, creator: req.userData.userId }, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Creating a schedule failed!"
      })
    }
    if (result) {
      res.status(400).json({
        message: "Schedule already Exists!",
      })
    } else {
      const schedule = new Schedule({
        title: req.params.scheduleName,
        creatorEmail: req.body.creatorID,
        creator: req.userData.userId,
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
  const creatorID = req.userData.userId;

  let scheduleName = ""

  Schedule.findById(scheduleID, function (err, result) {
    if (err) {
      res.status(500).json({ message: 'Error, Schedule does not exist' });
    } else {
      scheduleName = result.title
    }
  })


  Schedule.updateOne({ _id: scheduleID, creator: creatorID }, { title: newName },
    function (err, result) {
      if (err) {
        res.status(500).json({ message: 'Could not update schedule' });
      } else {
        if (result.nModified > 0) {
          res.send({ message: "Schedule Updated" })
        }
        else {
          res.status(500).json({ message: 'Error, Schedule name was not changed' });
        }
      }
    });
})

// Change schedule description
router.put('/editSchedule/description/:scheduleID', checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleID;
  const newDescription = req.body.newDescription;
  const creatorID = req.userData.userId;

  let scheduleDescription = ""

  Schedule.findById(scheduleID, function (err, result) {
    if (err) {
      res.status(500).json({ message: 'Error, Schedule does not exist' });
    } else {
      scheduleDescription = result.description
    }
  })


  Schedule.updateOne({ _id: scheduleID, creator: creatorID }, { description: newDescription },
    function (err, result) {
      if (err) {
        res.status(500).json({ message: 'Could not update schedule' });
      } else {
        if (result.nModified > 0) {
          res.send({ message: "Schedule Updated" })
        }
        else {
          res.status(500).json({ message: 'Error, Schedule description was not changed' });
        }
      }
    });
})

// Change schedules visibility
router.put(`/editSchedule/visibility/:scheduleID`, checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleID;
  const visibility = req.body.visibility;
  const creatorID = req.userData.userId;

  let scheduleVisibility = false

  Schedule.findById(scheduleID, function (err, result) {
    if (err) {
      res.status(500).json({ message: 'Error, Schedule does not exist' });
    } else {
      scheduleVisibility = result.public
    }
  })

  Schedule.updateOne({ _id: scheduleID, creator: creatorID }, { public: visibility },
    function (err, result) {
      if (err) {
        res.status(500).json({ message: 'Could not update schedule' });
      } else {
        if (result.nModified > 0) {
          res.send({ message: "Schedule Updated" })
        }
        else {
          res.status(500).json({ message: 'Error, Schedule visibility was not changed' });
        }
      }
    });
})

// Add a course to the schedule
router.put('/editSchedule/:scheduleId', checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleId
  const creatorID = req.userData.userId
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

    Schedule.updateOne({ _id: scheduleID, creator: creatorID }, {
      $addToSet: { courseList: addCourse }
    }, function (err, result) {
      if (err) {
        res.status(500).json({ message: 'Error, course was not added to schedule' });
      } else {
        if (result.nModified > 0) {
          res.send({ message: "Schedule Updated" })
        }
        else {
          res.status(500).json({ message: 'Error, course was not added to schedule' });
        }
      }
    }
    )
  })
})

// Remove a course from the schedule
router.delete('/editSchedule/:courseID/from/:scheduleId', checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleId
  const creatorID = req.userData.userId
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

    Schedule.updateOne({ _id: scheduleID, creator: creatorID }, {
      $pull: { courseList: addCourse }
    }, function (err, result) {
      if (err) {
        res.status(500).json({ message: 'Error, course was not deleted from schedule' });
      } else {
        if (result.nModified > 0) {
          res.send({ message: "Schedule Updated" })
        }
        else {
          res.status(500).json({ message: 'Error, course was not deleted from schedule' });
        }
      }
    }
    )
  })
})

// Delete a schedule
router.delete('/editSchedule/delete/:scheduleId', checkAuth, (req, res) => {
  const scheduleID = req.params.scheduleId
  const creatorID = req.userData.userId

  Schedule.deleteOne({ _id: scheduleID, creator: creatorID }, function (err, result) {
    if (err) {
      res.status(500).json({ message: 'Error, could not delete schedule' });
    }
    //console.log(result)
    if (result.deletedCount > 0) {
      res.send({ message: "Schedule Deleted" })
    }
    else {
      res.status(500).json({ message: 'Error, could not delete schedule' });
    }
  })
})

// returns a list of all public schedules
router.get('', (req, res) => {
  Schedule.find({ public: true }).sort('-updatedAt').limit(10).then(scheduleList => {
    res.send(scheduleList)
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching schedules failed!'
    })
  })
})

module.exports = router
