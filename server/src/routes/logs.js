const { Router } = require('express');
const Log = require('../models/log');

const router = Router();

router.get('/', async (req, res) => {
	const userId = req.query.userId;
	const logs = await Log.find({ userId }).exec();
	if (logs) return res.send(logs);
	else return status(404).send({ message: `Didnt find any logs for this user` });
});

router.post('/', async (req, res) => {
	console.log(req.body);

	const user = await User.findOne({ email }).exec();
	if (!user) {
		return res.status(404).send({ message: `User doesn't exist` });
	}

	const result = await new User(req.body).save();
	console.log(result);
	return res.send({ token: newUser._id });
});

module.exports = router;
