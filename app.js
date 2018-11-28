const express = require('express');
const db = require('./db');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3005;

const HouseholdController = require('./controllers/HouseholdController');
const EventController = require('./controllers/EventController');
const RoommateController = require('./controllers/RoommateController');


app.use(cors());

app.use('/event', EventController);
app.use('/household', HouseholdController);
app.use('/roommate', RoommateController);

app.listen(port, () => console.log(`Listening on port ${port}!`));












module.exports = app;
