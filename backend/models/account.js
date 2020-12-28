const mongoose = require('mongoose');
const joi = require('joi');

const accountSchema = mongoose.Schema({
  "fName": joi.string().regex(/^[^*|\":<>[\]{}`\\()';@&$?!]+$/).min(1).required(), //only a-z, A-Z, 0-9. No spaces allowed either.,
  "lName": joi.string().regex(/^[^*|\":<>[\]{}`\\()';@&$?!]+$/).min(1).required(), //only a-z, A-Z, 0-9. No spaces allowed either.,
  "email": joi.string().email().required(),
  "password": joi.string().min(1).required(),
  "active": {type: Boolean, default: true}
})

module.exports = mongoose.model('Account', accountSchema);
