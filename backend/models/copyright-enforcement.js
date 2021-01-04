const mongoose = require('mongoose');

const copyrightEnforcementSchema = mongoose.Schema({
  "title": String,
  "description": String,
}, { collection: 'CopyrightEnforcements' })

module.exports = mongoose.model('CopyrightEnforcement', copyrightEnforcementSchema);
