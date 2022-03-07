const multer = require('multer');
const sharp = require('sharp');

const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');
const Poster = require('./../models/posterModel');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		console.log('Its an image');
		cb(null, true);
	} else {
		cb(new AppError('Not an image! Please upload an image', 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadPoster = upload.single('poster');

exports.resizePoster = catchAsync(async (req, res, next) => {
	if (!req.file) return next();
	console.log(req.file);
	req.file.filename = `poster-${Date.now()}.jpeg`;

	await sharp(req.file.buffer)
		.resize(1800, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 50 })
		.toFile(`public/img/posters/${req.file.filename}`);
	console.log('Image resized!!');
	next();
});

exports.createPoster = factory.createOne(Poster);
exports.getPoster = factory.getOne(Poster);
exports.getAllPosters = factory.getAll(Poster);
exports.updatePoster = factory.updateOne(Poster);
exports.deletePoster = factory.deleteOne(Poster);
