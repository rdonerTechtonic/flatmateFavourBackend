const mongoose = require ('mongoose');
const express = require('express');
const nodemon = require('nodemon');
const bodyParser = require('body-parser')
const Roommate = require('../models/Roommate');
const router = express.Router();
router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

<<<<<<< HEAD:controllers/UserController.js
router.post('/?', function (req, res) {
  Roommate.create(req.body, (err, roommate) => {
=======


// let userObj = {
//   "userName": "Daffy Duck",
//   "userEmail": "daffy@gmail.com",
//   "userPassword": "password123",
//   "houseId": "5bf5a3fa16018b9d0931b72a",
// }


router.post('/', function (req, res) {

  // const roommate = {};
  // roommate.userName = req.body.firstName;
  // roommate.userEmail = req.body.lastName;
  // roommate.userPassword = req.body.password;
  // roommate.houseId = '5bfdb47cdae3da050a76a1a0';


  console.log(req.body);
  Roommate.create(req.body, (err, roommate) => {
    console.log(err);
>>>>>>> deb65fd42630ac86ce97573622cd44b452ddcdd2:controllers/RoommateController.js
    if (err) return res.status(500).send("There was a problem registering the user.");
    res.status(200).json(roommate);
  })
});

router.get('/?', function (req, res) {
<<<<<<< HEAD:controllers/UserController.js
  Roommate.find({houseId: req.query.houseId}, (err, roommate) => {
=======
  let searchParams = { };
  
  if (req.query.houseId) {
    searchParams = { houseId: req.query.houseId }
  }
  else if (req.query.roommateEmail) {
    searchParams = { roommateEmail: req.query.roommateEmail }
  }
  else if (req.query._id) {
    searchParams = { _id: req.query._id }
  }


  Roommate.find(
    {houseId: req.query.houseId},
  // {houseID: mongoose.Types.ObjectId(req.query.houseId)},
    (err, roommate) => {
>>>>>>> deb65fd42630ac86ce97573622cd44b452ddcdd2:controllers/RoommateController.js
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
