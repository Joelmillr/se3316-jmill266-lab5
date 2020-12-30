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
    res.send( courseList )
  })
})

// List of all course subjects and catalog numbers
app.get('/api/courses/subject_and_catalog_nbrs', (req, res) => {
  Course.find({}, 'subject catalog_nbr').then(catalog_nbrs => {
    res.send( catalog_nbrs )
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
  if(keyword.length < 4){
    res.send(`Keyword must be at least 4 characters long`)
  }
  Course.find({
    $or:[
      { catalog_nbr: { '$regex': `${keyword}`, $options: 'i' }},
      { catalog_nbr: Number(keyword) },
      { className: { '$regex': `${keyword}`, $options: 'i' }}]
  }).then(courseList => {
    res.send(courseList)
  })
})

// Search for course by subject and keyword
app.get('/api/courses/subject_and_keyword/:subject/:keyword', (req, res) => {
  // No course component in the parameters
  const subject = req.params.subject;
  const keyword = req.params.keyword;
  if(keyword.length < 4){
    res.send(`Keyword must be at least 4 characters long`)
  }
  Course.find({
    subject: { $regex: `${subject}`, $options: 'i' },
    $or:[
      { catalog_nbr: { $regex: `${keyword}`, $options: 'i' }},
      { catalog_nbr: Number(keyword) },
      { className: { $regex: `${keyword}`, $options: 'i' }}
    ] }).then(courseList => {
    res.send(courseList)
  })
});

// App schedule backend functions
//
//
//
// Returns all schedules for a specific user
app.get('/api/schedules/user/:userID', (req, res) => {
  const userID = req.params.userID
  Schedule.find({ creatorID: userID}).then(schedules => {
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
        courseList: [],
      })
      schedule.save();
      res.send(schedule)
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
