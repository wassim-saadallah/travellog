const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	userId: {
		type: mongoose.SchemaTypes.ObjectId,
		required: true,
	},
	location: {
		type: {
			type: String,
			enum: ['Point'],
			required: true,
		},
		coordinates: {
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
	},
	photos: {
		type: [String],
		required: false,
	},
});

module.exports = mongoose.model('log', UserSchema, 'log');
