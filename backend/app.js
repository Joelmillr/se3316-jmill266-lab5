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
    res.status(200).json({
      message: "Courses fetched successfully!",
      courses: courseList
    })
  })
})

// Get all course codes (property name: catalog_nbr) for a given subject code. Return an error if the subject code doesn’t exist.
app.get(`/api/courses/:subject`, (req, res) => {
  const subject = req.params.subject;
  Course.find({ subject: { $regex: `${subject}`, $options: 'i' } }).then(courseList => {
    res.status(200).json({
      message: `Showing results for subject = ${subject}`,
      courses: courseList
    })
  })
})

// Get the timetable entry for a given subject code, a course code and an optional course component. Return an error if the subject code or course code
// doesn’t exist. If the course component is not specified, return time table entries for all components.
app.get('/api/courses/:subject/:catalog_nbr', (req, res) => {
  // No course component in the parameters
  const subject = req.params.subject;
  const catalog_nbr = req.params.catalog_nbr;
  Course.find({ subject: { $regex: `${subject}`, $options: 'i' }, catalog_nbr: { $regex: `${catalog_nbr}`, $options: 'i' } }).then(courseList => {
    res.status(200).json({
      message: `Showing results for subject = ${subject}, catalog_nbr = ${catalog_nbr}`,
      courses: courseList
    })
  })
});

// Create a new schedule (to save a list of courses) with a given schedule name. Return an error if name exists.
app.post('/api/schedules/createSchedule/:scheduleName', (req, res) => {
  Schedule.exists({ title: req.params.scheduleName, creator: req.body.creator }, (err, result) => {
    if (result) {
      res.status(400).json({
        message: "Schedule already Exists!",
      })
    } else {
      const schedule = new Schedule({
        title: req.params.scheduleName,
        creator: req.body.creator,
        public: req.body.public,
        courseList: [],
      })
      schedule.save();
      res.status(201).json({
        message: "Schedule added successfully ",
        schedule: schedule
      })
    }
  })
});

// Save a list of subject code, course code pairs under a given schedule name. Return an error if the schedule name does not exist. Replace existing
// subject-code + course-code pairs with new values and create new pairs if it doesn’t exist. [10 points]
app.put('/api/schedules/editSchedule/:scheduleId', (req, res, next) => {
  const id = req.params.scheduleId
  const addCourse = req.body.course[0]

  const updateCouseList = {
    $push: { "courseList": addCourse }
  }

  Schedule.findByIdAndUpdate(id, {
    $addToSet: { courseList: addCourse }
  }, function (err, result) {
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

// returns a list of all public schedules
app.get('/api/schedules', (req, res) => {
  Schedule.find({ public: true }).then(scheduleList => {
    res.status(200).json({
      message: 'Showing all public schedules',
      schedules: scheduleList
    })
  })
})

module.exports = app;
