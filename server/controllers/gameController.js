const Game = require('./../models/gameModel');
const factory = require('./handleFactory');

exports.createGame = factory.createOne(Game);
exports.getGame = factory.getOne(Game);
exports.getAllGames = factory.getAll(Game);
exports.updateGame = factory.updateOne(Game);
exports.deleteGame = factory.deleteOne(Game);
