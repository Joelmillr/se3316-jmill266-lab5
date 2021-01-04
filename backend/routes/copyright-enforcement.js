const express = require('express');
const checkAuth = require('../middleware/check-auth');

const CopyrightEnforcement = require('../models/copyright-enforcement')

const router = express.Router()

// Get Copyright Enforcements
router.get('', (req, res) => {
  CopyrightEnforcement.find().then(document => {
    res.send(document)
  })
})

// Update Enforcement
router.put('/update/:documentID', checkAuth, (req, res) => {
  if (!req.userData.admin) res.status(400).json({ message: "You are not authorized!" });
  const documentID = req.params.documentID;
  const newDescription = req.body.newDescription;


  CopyrightEnforcement.updateOne({ _id: documentID }, { description: newDescription },
    function (err, result) {
      if (err) {
        res.status(500).json({ message: 'Could not update document' });
      } else {
        if (result.nModified > 0) {
          res.send({ message: "Document Updated" })
        }
        else {
          res.status(500).json({ message: 'Error, document description was not changed' });
        }
      }
    });
})

// Create DMCA/ notice and takedown policy
router.post('/new-document', checkAuth, (req, res) => {
  if(!req.userData.admin) res.status(400).json({ message: "You are not authorized!" });
  const title = req.body.title;
  const description = req.body.description;

  const copyrightEnforcement = new CopyrightEnforcement({
    title: title,
    description: description
  })
  copyrightEnforcement.save();
  res.send(copyrightEnforcement)

})

module.exports = router
