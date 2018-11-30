// @flow

//todo: add validation on front end and backend
//frontend: has to be a valid email and password length
//backend: can't use the same email twice
  //add a find to my register route to check for an email already there.

//controller methods shorter than 10 lines

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { createJWToken, verifyJWTToken } = require('../libs/Auth.js');
const { verifyJWT_MW } = require('../middlewares.js');

// This is your Library model,aka the schema definition for your library document.  This is a Mongoose model.  For more information, see https://mongoosejs.com/docs/models.html.
const Roommate = require('../models/Roommate');

// Use the express.Router class to create modular, mountable route handlers.  For more info, see https://expressjs.com/en/guide/routing.html.
// A Router instance is a complete middleware and routing system.
const router = express.Router();

// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
// The middleware was a part of Express.js earlier, but now you have to install it separately.  For more info, see https://github.com/expressjs/body-parser.
// This body-parser module, parses the JSON, buffer, string and URL-encoded data submitted using an HTTP POST request.  For more info, see https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express.
// limit
// Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'.
router.use(bodyParser.json());

router.post('/register', function (req, res) {
    const user = {};
    // user.firstName = req.body.user.firstName;
    // user.lastName = req.body.user.lastName;
    // // user.email = req.body.email;
    // user.password = req.body.user.password;
    // user.password = bcrypt.hashSync(req.body.password, 8);
    // console.log(user);
    Roommate.create(
      user, (err, roommate) => {
      if (err) return res.status(500).send('There was a problem registering the roommate.');
      console.log('user created');
      console.log(roommate);
      // res.status(200).send({ auth: true, token: createJWToken({ sessionData: user, maxAge: 3600 }) });
      res.send({ roommate: req.body.roommate });

    });

});

router.get('/verify', function (req, res) {
  const token = req.headers['x-access-token'];
  verifyJWTToken(token).then((decodedToken) => {
    // console.log(token.data);
    // console.log(token.data.$__._doc.firstName);
    // console.log(jwt.decode(token));
    // const decoded = jwt.decode(token, {complete: true});
    // const user = decodedToken.data._doc;
    res.status(200).send({ auth: true, token: decodedToken, name: `${decodedToken.data._doc.firstName} ${decodedToken.data._doc.lastName}`, message: 'User already logged in' });
    })
    .catch(() => {
    res.status(404).send({ auth: false, token: null, message: 'Invalid auth token provided. Unable to verify' });
  })
});

router.post('/login', function (req, res) {
  Roommate.findOne({ roommateEmail: req.body.roommateEmail },
    (err, roommate) => {
      console.log(roommate);
      if (err) return res.status(500).send('Error on the server.'); //hard error in backend session.
      if (!roommate.houseId) return res.status(404).send(`No house found for ${roommate.roommateName}.`); //no user
      if (req.body.roommatePassword === roommate.roommatePassword) {

      // if (bcrypt.compareSync(req.body.roommatePassword, roommate.roommatePassword)) {
        console.log('roommate logged in');
        res.status(200).send({ auth: true, roommateName: roommate.roommateName, token: createJWToken({ sessionData: roommate, maxAge: 3600 }) });
      } else {
        res.status(200).send({ auth: false, token: null, message: 'Invalid password.' });
      }
    }
  );
});

router.get('/logout', function (req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
