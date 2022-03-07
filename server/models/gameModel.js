const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Name of a game is required!'],
	},
	description: {
		type: String,
	},
	image :{
		type:String
	},
	video:{
		type:String,
	},
	link : {
		type:String,
		required: [true, 'Link of a game is required!'],
	}
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
