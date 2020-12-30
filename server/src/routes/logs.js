const { Router, json } = require('express');
const multer = require('multer');
const uploads = multer({ dest: '../uploads/' }); // travelog/server/uploads
const mongoose = require('mongoose');

const Log = require('../models/log');

const router = Router();

router.get('/', async (req, res) => {
	const userId = req.query.userId;
	const logs = await Log.find({ 'userId._id': userId }).exec();
	console.log(logs);
	if (logs) return res.send(logs);
	else return res.status(404).send({ message: `Didn't find any logs for this user` });
});

router.post('/', uploads.fields([{ name: 'images', maxCount: 10 }]), async (req, res) => {
	const parsedUserData = JSON.parse(req.body.userData);
	parsedUserData.location = { type: 'Point', coordinates: parsedUserData.location };
	console.log({parsedUserData});
	const { images } = req.files;
	const log = new Log({
		...parsedUserData,
	});
	if (images) log.photos= images.map(image => image.path)
	const  res = await log.save();
	console.log(res);
	const { location: { coordinates } } = res;
	return res.send({ success: true, logMarkerPosition: coordinates });
});

module.exports = router;
