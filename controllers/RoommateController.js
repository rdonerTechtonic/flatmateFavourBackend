const mongoose = require('mongoose');
const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');
const Roommate = require('../models/Roommate');
const router = express.Router();
router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));


// let roommateObj = {
//   "roommateName": "Daffy Duck",
//   "roommateEmail": "daffy@gmail.com",
//   "roommatePassword": "password123",
//   "houseId": "5bf5a3fa16018b9d0931b72a",
// }

router.get('/?', function (req, res) {
  let searchParams = { };

  if (req.query.houseId) {
    searchParams = { houseId: req.query.houseId };
  } else if (req.query.roommateEmail) {
    searchParams = { roommateEmail: req.query.roommateEmail };
  } else if (req.query._id) {
    searchParams = { _id: req.query._id };
  }

  Roommate.find(
    { houseId: req.query.houseId },
  // {houseID: mongoose.Types.ObjectId(req.query.houseId)},
    (err, roommate) => {
      if (err) return res.status(500).send('There was a problem getting the information from the database.');
      res.status(200).send(roommate);
    });
});

router.put('/?', function (req, res) {
  Roommate.update({ _id: req.query.roommateId },
    {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  }, (err, roommate) => {
      if (err) return res.status(500).send('There was a problem updating the house in the database.');
      res.status(200).send(roommate);
    });
});

router.delete('/:id', function (req, res) {
  Roommate.findByIdAndRemove(req.params.id, (err, roommate) => {
      if (err) return res.status(500).send('There was a problem deleting this event from the database.');
      res.status(200).send(roommate);
    });
});

module.exports = router;
