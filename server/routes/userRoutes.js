const router = require('express').Router();
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const bookingRouter = require('./../routes/bookingRoutes');

router.use('/:userId/bookings', bookingRouter);

router.post('/getsignature', authController.generateSignature);
router.post('/login', authController.login);
// router.post('/verifyJWT', authController.verifyJWT);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.post('/sendEmail', userController.sendEmail);

router.use(authController.restrictTo('admin'));

router.post('/signup', authController.signup);

router
	.route('/')
	.get(userController.getAllUsers)
	.post(userController.createUser);
router
	.route('/:id')
	.get(userController.getUser)
	.patch(userController.updateUser)
	.delete(userController.deleteUser);

module.exports = router;
