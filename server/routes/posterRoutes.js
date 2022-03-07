const router = require('express').Router();

const posterController = require('./../controllers/posterController');
const authController = require('./../controllers/authController');

router.use(authController.protect);
router.get('/', posterController.getAllPosters);
router.use(authController.restrictTo('admin'));

router
	.route('/')
	.post(
		posterController.uploadPoster,
		posterController.resizePoster,
		posterController.createPoster
	);
router
	.route('/:id')
	.get(posterController.getPoster)
	.patch(posterController.updatePoster)
	.delete(posterController.deletePoster);

module.exports = router;
