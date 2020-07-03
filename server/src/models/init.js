const mongoose = require('mongoose');
const UserModel = require('./user');
const LogModel = require('./log');

module.exports = { UserModel, LogModel };

module.exports.connectDb = function () {
	console.log('Connecting to database ...');
	return mongoose.connect(process.env.REMOTE_DB_URI || 'mongodb://localhost:27017/travelog', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
