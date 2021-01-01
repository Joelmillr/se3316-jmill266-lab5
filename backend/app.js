//mongoDB login creds:
//user0
//vuVYcNGUzTRhtag7

const express = require('express');
const bodyParser = require("body-parser")
const mongoose = require('mongoose')


const Course = require('./models/course');

const Schedule = require('./models/schedule');

const Account = require('./models/account');
const { scheduled } = require('rxjs');
const { Interface } = require('readline');
const course = require('./models/course');

const app = express();

mongoose.connect("mongodb+srv://user0:vuVYcNGUzTRhtag7@cluster0.urhpg.mongodb.net/userDB?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connected to database!");
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `*`);
  res.header(
    'Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    'Access-Control-Allow-Methods',
    `GET, POST, PUT, PATCH, DELETE, OPTIONS`
  );
  console.log(`${req.method} request for ${req.url}`);
  next();
})

// List of all Courses. Returns the list of Courses offered
app.get('/api/courses', (req, res) => {
  Course.find().then(courseList => {
    res.send(courseList)
  })
})

// List of all course subjects and catalog numbers
app.get('/api/courses/subject_and_catalog_nbrs', (req, res) => {
  Course.find({}, 'subject catalog_nbr').then(courses => {
    res.send(courses)
  })
})

// Search for course by subject
app.get(`/api/courses/subjects/:subject`, (req, res) => {
  const subject = req.params.subject;
  Course.find({ subject: { $regex: `${subject}`, $options: 'i' } }).then(courseList => {
    res.send(courseList)
  })
})

// Search for course by keyword (keyword must be at least 4 characters long)
app.get(`/api/courses/keywords/:keyword`, (req, res) => {
  const keyword = req.params.keyword;
  if (keyword.length < 4) {
    res.send(`Keyword must be at least 4 characters long`)
  }
  Course.find({
    $or: [
      { catalog_nbr: { '$regex': `${keyword}`, $options: 'i' } },
      { catalog_nbr: Number(keyword) },
      { className: { '$regex': `${keyword}`, $options: 'i' } }]
  }).then(courseList => {
    res.send(courseList)
  })
})

// Search for course by subject and keyword
app.get('/api/courses/subject_and_keyword/:subject/:keyword', (req, res) => {
  // No course component in the parameters
  const subject = req.params.subject;
  const keyword = req.params.keyword;
  if (keyword.length < 4) {
    res.send(`Keyword must be at least 4 characters long`)
  }
  Course.find({
    subject: { $regex: `${subject}`, $options: 'i' },
    $or: [
      { catalog_nbr: { $regex: `${keyword}`, $options: 'i' } },
      { catalog_nbr: Number(keyword) },
      { className: { $regex: `${keyword}`, $options: 'i' } }
    ]
  }).then(courseList => {
    res.send(courseList)
  })
});

// Return the id of a course when given a subject and course code
app.get('/api/courses/code/:subject/:catalog_nbr', (req, res) => {
  const subject = req.params.subject
  const catalog_nbr = req.params.catalog_nbr
  Course.find({
    subject: `${subject}`,
    $or: [
      { catalog_nbr: `${catalog_nbr}` },
      { catalog_nbr: Number(catalog_nbr) }
    ]
  }).then(course => {
    res.send(course)
  })
})

// App schedule backend functions
//
//
//
// Returns all schedules for a specific user
app.get('/api/schedules/user/:userID', (req, res) => {
  const userID = req.params.userID
  Schedule.find({ creatorID: userID }).then(schedules => {
    res.send(schedules)
  })
})

// Create a new schedule (to save a list of courses) with a given schedule name. Return an error if name exists.
app.post('/api/schedules/createSchedule/:scheduleName', (req, res) => {
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
app.put('/api/schedules/editSchedule/rename/:scheduleId', (req, res) => {
  const id = req.params.scheduleId;
  const newName = req.body.newName;

  Schedule.findByIdAndUpdate(id, { title: newName },
    function (err, result) {
      if (err) {
        console.log(err);
        return console.log('error');
      } else {
        console.log(result)
        console.log('Updated schedule');
        res.status(200).json({
          message: 'Schedule updated'
        })
      }
    });
})

// Change schedule description
app.put('/api/schedules/editSchedule/description/:scheduleId', (req, res) => {
  const id = req.params.scheduleId;
  const newDescription = req.body.newDescription;

  Schedule.findByIdAndUpdate(id, { description: newDescription },
    function (err, result) {
      if (err) {
        console.log(err);
        return console.log('error');
      } else {
        console.log(result)
        console.log('Updated schedule');
        res.status(200).json({
          message: 'Schedule updated'
        })
      }
    });
})

// Add a course to the schedule
app.put('/api/schedules/editSchedule/:scheduleId', (req, res) => {
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
app.delete('/api/schedules/editSchedule/:courseID/from/:scheduleId', (req, res) => {
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
app.delete('/api/schedules/editSchedule/delete/:scheduleId', (req, res) => {
  const scheduleID = req.params.scheduleId


  Schedule.findByIdAndDelete(scheduleID, function(err, result){
    res.send("schedule deleted")
  })
})

// returns a list of all public schedules
app.get('/api/schedules', (req, res) => {
  Schedule.find({ public: true }).then(scheduleList => {
    res.send(scheduleList)
  })
})

module.exports = app;
