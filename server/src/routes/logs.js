const { Router } = require('express');
const Log = require('../models/log');
const multer = require('multer');
const { update } = require('../models/log');

const router = Router();

router.get('/', async (req, res) => {
	const userId = req.query.userId;
	const logs = await Log.find({ userId }).exec();
	if (logs) return res.send(logs);
	else return status(404).send({ message: `Didnt find any logs for this user` });
});

router.post('/', async (req, res) => {
	console.log(req.body);
	console.log(req.files);

	return res.send({ success: true });
});

module.exports = router;
