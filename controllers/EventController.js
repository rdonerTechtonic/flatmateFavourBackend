const express = require('express');
const mongoose = require('mongoose');
const Events = require('../models/Events');
const router = express.Router();

router.get('/?', function (req, res) {console.log("get /events? fired");})
router.post('/?', function (req, res) {console.log("post /events? fired");})
router.put('/?', function (req, res) {console.log("put /events? fired");})
router.delete('/?', function (req, res) {console.log("delete /events? fired");})

module.exports = router;
