
const config = require('config');
const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://' + config.DbHost + ':' + config.DbPort + '/' + config.DbCollection,
    { useMongoClient: true, }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(cors());
app.use(express.json());

// REGISTER ROUTES -------------------------------
const defaultRoute = require('./routes/default.route');
const incidentRoute = require('./routes/incident.route');
const incidentSecureRoute = require('./routes/incident-secure.route');
const authRoute = require('./routes/auth.route');

app.use('/', defaultRoute);
app.use('/auth', authRoute);
app.use('/incident', incidentRoute);
app.use('/incident-admin', incidentSecureRoute);

// START THE SERVER
app.listen(config.Port);
console.log('API-Server startet on port ' + config.Port);

// Export the app for testing!
module.exports = app;
