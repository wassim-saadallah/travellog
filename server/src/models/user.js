const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
  },
})

module.exports = mongoose.model('user', UserSchema, 'user')
