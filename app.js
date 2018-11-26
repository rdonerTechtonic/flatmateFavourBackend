const express = require('express');
const db = require('./db');
const app = express();


const HouseholdController = require('./controllers/HouseholdController');

const port = process.env.PORT || 3000;

app.use('/household', HouseholdController);

app.listen(port, () => console.log(`Listening on port ${port}!`));












module.exports = app;
