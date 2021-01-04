const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
          res.status(500).json({ error: err })
        })
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
        fName: fetchedUser.fName,
        lName: fetchedUser.lName,
        email: fetchedUser.email,
        userId: fetchedUser._id
      },
      '3316A_Lab5_jmill266_secret',
      { expiresIn: '1h' }
    )
    res.status(200).json({
      token: token
    })
  }).catch(err => {
    return res.status(404).json({
      message: "Authentication Failed!"
    })
  })
})


module.exports = router
