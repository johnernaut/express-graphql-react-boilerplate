const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.render('index');
});

// Respond to the Google Cloud health check.
routes.get('/_ah/health', (req, res) => {
  res.type('text').send('ok');
});

module.exports = routes;
