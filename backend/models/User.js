const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true   // 👈 important
  },
  email: {
    type: String,
    required: true,
    unique: true     // 👈 important
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);