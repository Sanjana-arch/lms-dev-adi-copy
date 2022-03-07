const Booking = require('./../models/bookingModel');
const factory = require('./handleFactory');

exports.setGameUserIds = (req, res, next) => {
	// Allow nested routes
	if (!req.body.user) req.body.user = req.user.id;
	next();
};

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
