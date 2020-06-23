const { Schema, model, SchemaTypes } = require('mongoose')

const Schema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates:  {
      type: [Number],
      required: true,
    },
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  }
})

module.exports = model('log', UserSchema, 'log')
