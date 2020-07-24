const mongoose = require('mongoose');
const UserModel = require('./user');
const LogModel = require('./log');

module.exports = { UserModel, LogModel };

module.exports.connectDb = function () {
  databaseUri = process.env.REMOTE_DB_URI || 'mongodb://localhost:27017/travelog';
	console.log(`Connecting to database ${databaseUri} ...`);
	return mongoose.connect(databaseUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
