'use strict';

const express = require('express');
const logger = require('morgan');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const moment = require('moment');
const jwt = require('express-jwt');

// Models
const { User } = require('../models');

// GraphQL
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const schema = require('../schema');

const app = express();

app.use(cors());
app.set('trust proxy', true);

// GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }

      return null;
    }
  }),
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user ? User.findOne({ _id: req.user.id }) : null
    }
  }))
);
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql'
  })
);

// Useful middleware setup.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Initialize Passport and restore any existing authentication state.
app.use(passport.initialize());
app.use(passport.session());

// Middleware that exposes the user object (if any) to views.
app.use((req, res, next) => {
  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});
app.locals.moment = moment;

// Routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build', 'index.html'));
});

// Catch 404 errors and forward to error handler.
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Error handlers.

// Development error handler.
// Will print stacktrace.
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler.
// No stacktraces leaked to user.
app.use((err, req, res) => {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
