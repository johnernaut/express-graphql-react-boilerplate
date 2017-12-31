const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, dropDups: true, required: true },
  password: String,
  jwt: String
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
