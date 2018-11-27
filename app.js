const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const HouseholdController = require('./controllers/HouseholdController');
const EventController = require('./controllers/EventController');
const UserController = require('./controllers/UserController');


app.use(cors());

app.use('/event', EventController);
app.use('/household', HouseholdController);
app.use('/roommate', UserController);

app.listen(port, () => console.log(`Listening on port ${port}!`));












module.exports = app;
