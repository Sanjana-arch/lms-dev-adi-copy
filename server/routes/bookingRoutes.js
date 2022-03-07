const express = require('express');
const authController = require('./../controllers/authController');
const bookingController = require('./../controllers/bookingController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.route('/').get(bookingController.getAllBooking);
router.use(authController.restrictTo('admin'));

router
	.route('/')
	.post(bookingController.setGameUserIds, bookingController.createBooking);
router
	.route('/:id')
	.get(bookingController.getBooking)
	.patch(bookingController.updateBooking)
	.delete(bookingController.deleteBooking);

module.exports = router;
