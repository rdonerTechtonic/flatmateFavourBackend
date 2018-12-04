const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Event = require('../models/Event');
const router = express.Router();
router.use(bodyParser.json());
const { verifyJWT_MW } = require('../middlewares');

router.all('*', verifyJWT_MW);


// router.get('/:houseId', function (req, res) {
router.get('/?', function (req, res) {
    let searchParams = { };
    if (req.query.houseId) {
      searchParams = { houseId: req.query.houseId };
    } else if (req.query.eventStartDate) {
      searchParams = { eventStartDate: req.query.eventStartDate };
    } else if (req.query.eventOwner) {
      searchParams = { eventOwner: req.query.eventOwner };
    } else if (req.query._id) {
      searchParams = { _id: req.query._id };
    }
    Event.find(searchParams, (err, events) => {
      if (err) return res.status(500).send('Events not found.');
      res.status(200).send(events);
    })
    .populate('eventOwner eventAssignees').exec((err, eventAssignees) => {
    });
  });

router.post('/?', function (req, res) {
  Event.create(req.body, (err, event) => {
    if (err) return res.status(500).send('Event not posted.');
    res.status(200).send(event);
  });
});

router.put('/?', function (req, res) {
  Event.update({ _id: req.query.eventId }, { $set: req.body }, (err, event) => {
    if (err) return res.status(500).send('Event not updated.');
    res.status(200).send(event);
  });
});

router.delete('/:id', function (req, res) {
  Event.findByIdAndRemove(req.params.id, (err, event) => {
      if (err) return res.status(500).send('There was a problem deleting this event from the database.');
      res.status(200).send(event);
    });
});

module.exports = router;
