const express = require('express');
const mongoose = require('mongoose');


// This is your Library model,aka the schema definition for your library document.  This is a Mongoose model.  For more information, see https://mongoosejs.com/docs/models.html.
const Events = require('../models/Events');

// Use the express.Router class to create modular, mountable route handlers.  For more info, see https://expressjs.com/en/guide/routing.html.
// A Router instance is a complete middleware and routing system.
const router = express.Router();

// body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
// The middleware was a part of Express.js earlier, but now you have to install it separately.  For more info, see https://github.com/expressjs/body-parser.
// This body-parser module, parses the JSON, buffer, string and URL-encoded data submitted using an HTTP POST request.  For more info, see https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express.
// limit
// Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'.

router.get('/?', function (req, res) {console.log("get /events? fired");})

module.exports = router;
