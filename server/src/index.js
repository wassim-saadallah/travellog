const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const multer = require('multer');

const userRouter = require('./routes/users');
const logsRouter = require('./routes/logs');
const { connectDb } = require('./models/init');

require('dotenv').config();

const app = express();
const uploads = multer({ dest: '/uploads' });

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/user', userRouter);
app.use('/logs', uploads.fields([{ name: 'images' }]), logsRouter);

connectDb()
	.then(async () => {
		console.log('Connection successful');
		app.listen(3000, () => {
			console.log('application started at port 3000');
		});
	})
	.catch((err) => {
		console.log('A database connection error has occured');
		console.log(err);
	});
