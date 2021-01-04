const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const checkAuth = require('../middleware/check-auth')

const User = require("../models/user")

const router = express.Router()

// New user registration
router.post("/signup", (req, res, next) => {
  // fName, lName, email, password, (active), status
  //bycrpt.hash(req.body.email, 10).then(hash=>{
  // Send this hash to email
  //})

  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: hash
      })
      user.save().then(result => {
        res.send(result)
      })
        .catch(err => {
          res.status(500).json({ message: 'Invalid authentication credentials' })
        })
    })
})

// Change user password
router.put("/change-password", checkAuth, (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const userID = req.userData.userId
  User.findOne({ _id: userID }).then(user => {
    if (!user) {
      res.status(404).json({
        message: "Authentication Failed!"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(oldPassword, user.password)
  }).then(result => {
    if (!result) {
      res.status(404).jsnon({
        message: "Wrong Password!"
      })
    } else {
      bcrypt.hash(newPassword, 10)
        .then(hash => {
          User.updateOne({ _id: userID }, { password: hash }).then(result => {
            if (result.nModified > 0) {
              res.status(200).json({ message: "User password updated" })
            }
            else {
              res.status(500).json({ message: 'Error, users password was not changed' });
            }
          })
        })
    }
  })
})

// Old user authentication
router.post("/login", (req, res, next) => {
  let fetchedUser;

  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(404).jsnon({
        message: "Authentication Failed!"
      });
    }
    if (!user.active) {
      res.status(404).jsnon({
         message: "Please Contact Site Admin, your account is deactivated!"
        })
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password)
  }).then(result => {
    if (!result) {
      return res.status(404).jsnon({
        message: "Authentication Failed!"
      })
    }
    // JWT
    const token = jwt.sign(
      {
        email: fetchedUser.email,
        admin: fetchedUser.admin,
        userId: fetchedUser._id
      },
      '3316A_Lab5_jmill266_secret',
      { expiresIn: '1h' }
    )
    res.status(200).json({
      token: token,
      isAdmin: fetchedUser.admin,
      expiresIn: 3600
    })

  }).catch(err => {
    return res.status(404).json({
      message: "Please Contact Site Admin, your account is deactivated!"
    })
  })
})


module.exports = router
