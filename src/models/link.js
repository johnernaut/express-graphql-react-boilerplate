const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  url: String,
  description: String
});

const Link = mongoose.model('links', LinkSchema);

module.exports = Link;
