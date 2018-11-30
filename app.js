const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3005;

const AuthController = require('./controllers/AuthController');
const EventController = require('./controllers/EventController');
const HouseholdController = require('./controllers/HouseholdController');
const RoommateController = require('./controllers/RoommateController');

app.use(cors());

app.use('/auth', AuthController);
app.use('/event', EventController);
app.use('/household', HouseholdController);
app.use('/roommate', RoommateController);

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
