const express = require('express');
const bodyParser = require("body-parser")

const courseList = require('../Lab3-timetable-data.json')

const app = express();

app.use(bodyParser.json())

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

// Returns the list of Courses offered
app.get('/api/courses', (req,res) => {
  res.send(courseList)
})

module.exports = app;
