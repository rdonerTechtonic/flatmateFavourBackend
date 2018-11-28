const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Event = require('../models/Event');
const router = express.Router();
router.use(bodyParser.json());


// router.get('/:houseId', function (req, res) {
router.get('/?', function (req, res) {
  Event.find({houseId: req.query.houseId}, (err,events) => {
  let searchParams = { };

  if (req.query.houseId) {
    searchParams = { houseId: req.query.houseId }
  }
  else if (req.query.eventStartDate) {
    searchParams = { eventStartDate: req.query.eventStartDate }
  }
  else if (req.query.eventOwner) {
    searchParams = { eventOwner: req.query.eventOwner }
  }
  else if (req.query._id) {
    searchParams = { _id: req.query._id }
  }

  Event.find(searchParams, (err,events) => {
    if (err) return res.status(500).send('Events not found.')
    res.status(200).send(events)
  })
})

router.post('/?', function (req, res) {
  Event.create(req.body, (err, event) => {
    if (err) return res.status(500).send('Event not posted.')
    res.status(200).send(event);
  })
})

router.put('/?', function (req, res) {
  Event.update({_id: req.query.eventId},
    {
      eventTitle: req.body.eventTitle,
      eventAssignees: req.body.eventAssignees,
      eventDescription: req.body.eventDescription,
      eventStartDate: req.body.eventStartDate,
      eventEndDate: req.body.eventEndDate,
      eventLocation: req.body.eventLocation,
      eventStatus: req.body.eventStatus,
    },
    (err,event) => {
    if (err) return res.status(500).send('Event not updated.')
    res.status(200).send(event)
  })
})

module.exports = router;
