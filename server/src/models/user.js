const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  fullName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
})

module.exports = (db) => db.model('user', UserSchema, 'user')
