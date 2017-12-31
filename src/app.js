'use strict';

if (process.env.NODE_ENV === 'production') {
  // cloud tracing
  var agent = require('@google-cloud/trace-agent').start();
}

require('dotenv').config();

// MongoDB.
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connection.on(
  'error',
  console.error.bind(console, 'Error connecting to mongo: ')
);

mongoose.connection.on('connected', error => {
  console.log('Connected to MongoDB at ' + process.env.MONGO_HOST);
});

mongoose.connect(process.env.MONGO_HOST, { useMongoClient: true });

// Init express
var app = require('./config/express');

// Start the server on the correct port.
const server = app.listen(process.env.PORT || '3000', () => {
  console.log(`Drow listening on port ${server.address().port}`);
});
