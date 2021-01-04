const express = require('express')

const User = require('../models/user')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

// return a list of users
router.get("/users", checkAuth, (req, res) => {
  if(!req.userData.admin) res.status(400).json({ message: "You are not authorized!" });
  User.find().then(users => {
    res.send(users)
  }).catch(error => {
    res.status(500).json({
      message: 'Fetching schedules failed!'
    })
  })
})

// Activate a user
router.put("/users/activate/:userID", checkAuth, (req, res) => {
  if(!req.userData.admin) res.status(400).json({ message: "You are not authorized!" });
  userID = req.params.userID

  User.findById(userID).then(user => {
    if (!user) res.status(500).json({ message: 'Error, User does not exist' });
  }).catch(err => {
    res.status(500).json({ message: 'Error, User does not exist' })
  })

  User.updateOne({ _id: userID }, { active: true },
    function (err, result) {
      if (err) {
        res.status(500).json({ message: 'Could not update user' });
      } else {
        if (result.nModified > 0) {
          res.send({ message: "User Activated" })
        }
        else {
          res.status(500).json({ message: 'Error, User activation was not changed' });
        }
      }
    });
})

// Deactivate a user
router.put("/users/deactivate/:userID", checkAuth, (req, res) => {
  if(!req.userData.admin) res.status(400).json({ message: "You are not authorized!" });
  userID = req.params.userID

  User.findById(userID).then(user => {
    if (!user) res.status(500).json({ message: 'Error, User does not exist' });
  }).catch(err => {
    res.status(500).json({ message: 'Error, User does not exist' })
  })

  User.updateOne({ _id: userID }, { active: false },
    function (err, result) {
      if (err) {
        res.status(500).json({ message: 'Could not update user' });
      } else {
        if (result.nModified > 0) {
          res.send({ message: "User Deactivated" })
        }
        else {
          res.status(500).json({ message: 'Error, User activation was not changed' });
        }
      }
    });
})

// Give Admin priviledges
router.put("/users/admin/:userID", checkAuth, (req, res) => {
  if(!req.userData.admin) res.status(400).json({ message: "You are not authorized!" });
  userID = req.params.userID

  User.findById(userID).then(user => {
    if (!user) res.status(500).json({ message: 'Error, User does not exist' });
  }).catch(err => {
    res.status(500).json({ message: 'Error, User does not exist' })
  })

  User.updateOne({ _id: userID }, { admin: true },
    function (err, result) {
      if (err) {
        res.status(500).json({ message: 'Could not update user' });
      } else {
        if (result.nModified > 0) {
          res.send({ message: "User Given Admin Priviledges" })
        }
        else {
          res.status(500).json({ message: 'Error, User activation was not changed' });
        }
      }
    });
})

module.exports = router
