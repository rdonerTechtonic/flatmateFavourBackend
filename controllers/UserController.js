const mongoose = require ('mongoose');
const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser')
const Roommate = require('../models/User');
const router = express.Router();
router.use(bodyParser.json());



// let userObj = {
//   "userName": "Daffy Duck",
//   "userEmail": "daffy@gmail.com",
//   "userPassword": "password123",
//   "houseId": "5bf5a3fa16018b9d0931b72a",
// }




router.post('/?', function (req, res) {
  Roommate.create(req.body.roommate, (err, roommate) => {
    if (err) return res.status(500).send("There was a problem registering the user.");
    res.status(200).json(roommate);
  })
});


router.get('/?', function (req, res) {
  console.log(req.query);
  Roommate.find(
    {houseId: req.query.houseId},
  // {houseID: mongoose.Types.ObjectId(req.query.houseId)},
    (err, roommate) => {
      if (err) return res.status(500).send("There was a problem getting the information from the database.");
      res.status(200).send(roommate);
    });
});

router.put('/?', function (req, res) {
  Roommate.update({_id: req.query.roommateId},
    {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  },(err, roommate) => {
      if (err) return res.status(500).send("There was a problem updating the house in the database.");
      res.status(200).send(roommate);
    });
});

module.exports = router;
