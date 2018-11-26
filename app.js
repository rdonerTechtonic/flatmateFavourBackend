const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();


const port = process.env.PORT || 3000;
const EventController = require('./controllers/EventController');

app.use(cors());

app.use('/event', EventController);


app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
