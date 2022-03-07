const User = require('../models/userModel');
const factory = require('./handleFactory');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');

exports.createUser = factory.createOne(User);
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.sendEmail = catchAsync(async (req, res, next) => {
	let data = req.body;
	// console.log(data);

	if (data.game) {
		await new Email(req.user, null, true, data).sendRequestAccess();
	}
	if (data.body) {
		await new Email(req.user, null, true, data).sendContactUs();
	}
	res.status(200).json({
		status: 'success',
	});
});
