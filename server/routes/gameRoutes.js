const router = require('express').Router();
const authController = require('./../controllers/authController');
const gameController = require('./../controllers/gameController');

router.use(authController.protect);

router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGame);

router.use(authController.restrictTo('admin'));

router.route('/').post(gameController.createGame);
router
	.route('/:id')
	.patch(gameController.updateGame)
	.delete(gameController.deleteGame);

module.exports = router;
