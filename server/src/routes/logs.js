const { Router, json } = require('express');
const multer = require('multer');
const uploads = multer({ dest: '../uploads/' }); // travelog/server/uploads

const Log = require('../models/log');

const router = Router();

router.get('/', async (req, res) => {
	const userId = req.query.userId;
	const logs = await Log.find({ userId }).exec();
	if (logs) return res.send(logs);
	else return status(404).send({ message: `Didn't find any logs for this user` });
});

router.post('/', uploads.fields([{ name: 'images', maxCount: 10 }]), async (req, res) => {
  const parsedUserData = JSON.parse(req.body.userData);
  parsedUserData.location = {type: 'Point', coordinates: parsedUserData.location};
  console.log({parsedUserData});
  const { images } = req.files;
  const log = new Log({
    ...parsedUserData,
    photos: images.map(image => image.path)
  });

  const { location: { coordinates } } = await log.save()
  return res.send({ success: true, logMarkerPosition: coordinates });
});

module.exports = router;
