const mongoose = require('mongoose');
const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser');
const Roommate = require('../models/Roommate');
const router = express.Router();
router.use(bodyParser.json());
const { verifyJWT_MW } = require('../middlewares');

router.all('*', verifyJWT_MW);

router.get('/?', function (req, res) {
  let searchParams = { };
  if (req.query.houseId) {
    searchParams = { houseId: req.query.houseId };
  } else if (req.query.roommateEmail) {
    searchParams = { roommateEmail: req.query.roommateEmail };
  } else if (req.query._id) {
    searchParams = { _id: req.query._id };
  }
  Roommate.find(searchParams ,(err, roommate) => {
      if (err) return res.status(500).send('There was a problem getting the information from the database.');
      res.status(200).send(roommate);
    });
});

router.put('/?', function (req, res) {
  Roommate.update({ _id: req.query.roommateId }, { $set: req.body }, (err, roommate) => {
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
