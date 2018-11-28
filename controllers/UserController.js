const mongoose = require ('mongoose');
const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser')
const Roommate = require('../models/User');
const router = express.Router();
router.use(bodyParser.json());

router.post('/?', function (req, res) {
  Roommate.create(req.body, (err, roommate) => {
    if (err) return res.status(500).send("There was a problem registering the user.");
    res.status(200).json(roommate);
  })
});

router.get('/?', function (req, res) {
  Roommate.find({houseId: req.query.houseId}, (err, roommate) => {
      if (err) return res.status(500).send("There was a problem getting the information from the database.");
      res.status(200).send(roommate);
    });
});

router.put('/?', function (req, res) {
  Roommate.update({_id: req.query.roommateId},
    {
    roommateName: req.body.roommateName,
    roommateEmail: req.body.roommateEmail,
    roommatePassword: req.body.roommatePassword,
    houseId: req.body.houseId
  },(err, roommate) => {
      if (err) return res.status(500).send("There was a problem updating the house in the database.");
      res.status(200).send(roommate);
    });
});

module.exports = router;
