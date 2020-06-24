const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  fullName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
})

module.exports = mongoose.model('user', UserSchema, 'user')
