const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
  "fName": { type: String, required: true },
  "lName": { type: String, required: true },
  "email": { type: String, required: true, unique: true },
  "password": { type: String, required: true },
  "active": { type: Boolean, default: true },
  "admin": { type: Boolean, default: false },
  "status": { type: String, default: "pending" }
}, { collection: 'Users' })

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);
