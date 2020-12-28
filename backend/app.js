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

connection.once("open", function() {
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
app.get('/api/courses', (req,res) => {
  Course.find().then(courseList => {
    console.log(subjects)
    res.status(200).json({
      message: "Courses fetched successfully!",
      courses: courseList
    })
  })
})

// Get all course codes (property name: catalog_nbr) for a given subject code. Return an error if the subject code doesn’t exist.
app.get(`/api/courses/:subject`, (req, res) => {
  const subject = req.params.subject;
  Course.find({subject: {$regex: `${subject}`, $options: 'i'}}).then(courseList => {
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
  Course.find({subject: {$regex: `${subject}`, $options: 'i'}, catalog_nbr: {$regex: `${catalog_nbr}`, $options: 'i'}}).then(courseList => {
    res.status(200).json({
      message: `Showing results for subject = ${subject}, catalog_nbr = ${catalog_nbr}`,
      courses: courseList
    })
  })
});

// Create a new schedule (to save a list of courses) with a given schedule name. Return an error if name exists.
app.post('/api/schedule/createSchedule/:scheduleName', (req, res) => {
    const scheduleName = req.params.scheduleName;
    const schedule = new Schedule({
      title: scheduleName,
      creator: req.body.creator,
    })
    res.status(201).json({
      message: "Schedule added successfully",
      schedule: schedule
    })
});

module.exports = app;
