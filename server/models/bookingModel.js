const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
	game: {
		type: mongoose.Schema.ObjectId,
		ref: 'Game',
		required: [true, 'Booking must belong to a Game'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'Booking must belong to a User'],
	},
	timeLimit: {
		type: Date,
		required: true,
	},
	sessions: {
		type: Number,
		required: true,
	},
	maxPlayers: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

bookingSchema.pre(/^find/, function (next) {
	this.populate('user').populate('game');
	next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
