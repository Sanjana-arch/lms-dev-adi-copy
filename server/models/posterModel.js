const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
	path: {
		type: String,
		
		
		
	},
	title: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const Poster = mongoose.model('Poster', posterSchema);

module.exports = Poster;
