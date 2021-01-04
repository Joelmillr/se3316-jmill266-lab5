const express = require('express');

const Course = require('../models/course')

const router = express.Router()

// List of all Courses. Returns the list of Courses offered
router.get('', (req, res) => {
  const pagesize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const courseQuery = Course.find()
  if (pagesize && currentPage) {
    courseQuery.skip(pagesize * (currentPage - 1))
      .limit(pagesize)
  }

  courseQuery.then(courseList => {
    res.send(courseList)
  })
})

// List of all course subjects and catalog numbers
router.get('/subject_and_catalog_nbrs', (req, res) => {
  Course.find({}, 'subject catalog_nbr').then(courses => {
    res.send(courses)
  })
})

// Search for course by subject
router.get(`/subjects/:subject`, (req, res) => {
  const subject = req.params.subject;
  Course.find({ subject: { $regex: `${subject}`, $options: 'i' } }).then(courseList => {
    res.send(courseList)
  })
})

// Search for course by keyword (keyword must be at least 4 characters long)
router.get(`/keywords/:keyword`, (req, res) => {
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
router.get('/subject_and_keyword/:subject/:keyword', (req, res) => {
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
router.get('/code/:subject/:catalog_nbr', (req, res) => {
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

module.exports = router
