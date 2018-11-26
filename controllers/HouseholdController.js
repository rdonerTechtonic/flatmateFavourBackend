const mongoose = require ('mongoose');
const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser')
const Household = require('../models/Household');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true, limit: '5mb'}));


// let houseObj =
//   {"houseName": "The Davis's",
//   "houseAddress": "123 Main",
//   "houseOwner": "5bf5a3fa16018b9d0931b701",
//   "houseCity": "Boulder",
//   "houseState": "CO",
//   "houseLongitude": "",
//   "houseLatitude": "",
// }


router.post('/?', function (req, res) {
  Household.create(req.body.house, (err, household) => {
    if (err) return res.status(500).send("There was a problem registering the user.");
    res.status(200).json(household);
  })
});


router.get('/?', function (req, res) {

  Household.find({_id: req.query.houseId},
    (err, household) => {
      if (err) return res.status(500).send("There was a problem getting the information from the database.");
      res.status(200).send(household);
    });
});


router.put('/?', function (req, res) {


  Household.update({
    _id: req.query.houseId},
    {
    houseName: req.body.houseName,
    houseAddress: req.body.houseAddress,
    houseOwner: req.body.houseOwner,
    houseCity: req.body.houseCity,
    houseState: req.body.houseState,
    houseLongitude: req.body.houseLongitude,
    houseLatitude: req.body.houseLatitude,
  },
    (err, household) => {
      if (err) return res.status(500).send("There was a problem updating the house in the database.");
      res.status(200).send(household);
    });
});




module.exports = router;
