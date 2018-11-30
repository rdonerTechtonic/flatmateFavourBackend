const mongoose = require('mongoose');
const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');
const Household = require('../models/Household');
const router = express.Router();
router.use(bodyParser.json());

router.post('/?', function (req, res) {
  Household.create(req.body, (err, household) => {
    if (err) return res.status(500).send('There was a problem registering the roommate.');
    res.status(200).send(household);
  });
});

router.get('/?', function (req, res) {
  Household.find({ _id: req.query.houseId },
    (err, household) => {
      if (err) return res.status(500).send('There was a problem getting the information from the database.');
      res.status(200).send(household);
    });
});

router.put('/?', function (req, res) {
  Household.update({ _id: req.query.houseId }, { $set: req.body }, (err, household) => {
      if (err) return res.status(500).send('There was a problem updating the house in the database.');
      res.status(200).send(household);
    });
});

// { new:true },

router.delete('/:id', function (req, res) {
  Household.findByIdAndRemove(req.params.id, (err, household) => {
      if (err) return res.status(500).send('There was a problem deleting this event from the database.');
      res.status(200).send(household);
    });
});

router.get('/lookupInvite/:email', function (req, res) {
  Household.find({ houseInvitees: email }, (err, household) => {
    if (err) return res.status(500).send('No household found with that user as an invitee.');
    res.status(200).send(household);
  });
});

module.exports = router;
