const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const generator = require('generate-password');

const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const User = require('../models/userModel');
const Email = require('./../utils/email');

const forgotPassword = async (user, req, res, next) => {
	// 2) Generate a random token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	// 3) Send it to user's email
	try {
		const resetURL = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;
		await new Email(user, resetURL, null).sendPasswordReset();

		return res.status(200).json({
			status: 'Reset token sent to email',
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });
		return next(
			new AppError(
				'There was an error sending the email. Try again later!',
				500
			)
		);
	}
};

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createSendToken = (user, statusCode, req, res) => {
	let secure;
	const token = signToken(user._id);
	/*if (process.env.NODE_ENV != 'development')
		secure = req.secure || req.headers('x-forwarded-proto') === 'https';*/
	res.cookie('jwt', token, {
		sameSite: 'none',
		path: '/',
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		secure: true,
	});

	user.password = undefined;
	res.status(statusCode).json({
		status: 'success',
		token,
		data: {
			user,
		},
	});
};

exports.generateSignature = catchAsync((req, res, next) => {
	const timestamp = new Date().getTime() - 30000;
	const msg = Buffer.from(
		process.env.ZOOM_JWT_API_KEY +
			req.body.meetingNumber +
			timestamp +
			req.body.role
	).toString('base64');
	const hash = crypto
		.createHmac('sha256', process.env.ZOOM_JWT_API_SECRET)
		.update(msg)
		.digest('base64');
	const signature = Buffer.from(
		`${process.env.ZOOM_JWT_API_KEY}.${req.body.meetingNumber}.${timestamp}.${req.body.role}.${hash}`
	).toString('base64');
	res.status(200).json({
		signature: signature,
	});
});

exports.signup = catchAsync(async (req, res, next) => {
	const password = generator.generate({
		length: 10,
		uppercase: true,
		numbers: true,
		symbols: true,
		strict: true,
		exclude: `"'$.;&*<>+-`,
	});
	console.log(password);
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		password,
		passwordConfirm: password,
	});
	const url = `${process.env.CLIENT_URL}/dashboard`;
	await new Email(newUser, url, null, { password }).sendWelcome();

	newUser.password = undefined;
	res.status(201).json({
		status: 'success',
		data: {
			newUser,
		},
	});
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	console.log(email);
	console.log(password);
	// 1) Chack if email and password exists
	if (!email || !password) {
		return next(new AppError('Please provide email and password!', 400));
	}
	// 2) Check if user exists && password in correct
	const user = await User.findOne({ email }).select('+password +newUser');

	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError('Incorrect email or password', 401));
	}
	// If new user then send a reset token
	if (user.newUser) return forgotPassword(user, req, res, next);

	// 3) If everything OK, send then to the client
	createSendToken(user, 200, req, res);
});

exports.googleLogin = catchAsync(async (req, res, next) => {
	const { token } = req.body;

	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID,
	});
	const { email } = ticket.getPayload();

	const user = await User.findOne({ email }).select('+password +newUser');
	if (!user) {
		return next(new AppError('Email not linked!', 401));
	}
	// If new user then send a reset token
	if (user.newUser) return forgotPassword(user, req, res, next);

	// 3) If everything OK, send then to the client
	createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
	console.log('log out req');
	res.status(200).clearCookie('jwt').json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
	// 1) Get token and check if it exists
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}
	if (!token) {
		return next(
			new AppError('You are not logged in! Please log in to get access', 401)
		);
	}
	// 2) Verify token
	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

	// 3) Check if user still exists
	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next(
			new AppError('The user belonging to this token does not exist', 401)
		);
	}

	// 4) Check if user changed password after the token was issued
	if (currentUser.changedPasswordAfter(decoded.iat)) {
		return next(
			new AppError('User recently changed password! Please log in again', 401)
		);
	}

	// Grant access to the protect route
	req.user = currentUser;
	next();
});

exports.isLoggedIn = async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}
	// 1) Get token and check if it exists
	if (token) {
		try {
			// 1) Verification
			const decoded = await promisify(jwt.verify)(
				token,
				process.env.JWT_SECRET
			);

			// 2) Check if user still exists
			const currentUser = await User.findById(decoded.id);
			if (!currentUser) {
				return next(); /* res.status(401).send("User doesn't exist"); */
			}

			// 3) Check if user changed password after the token was issued
			if (currentUser.changedPasswordAfter(decoded.iat)) {
				return next();
			}

			// There is a logged in user
			res.user = currentUser;
			return next();
		} catch (err) {
			return next(); /* res.status(401).send('Error'); */
		}
	} else {
		return next(); /* res.status(401).send('Unauthorized: No token provided'); */
	}
};

exports.restrictTo = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new AppError('You do not have permission to perform this action', 403)
			);
		}
		next();
	};
};
exports.forgotPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on Posted email
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return next(new AppError('There is no user with email address', 404));
	}

	// 2) Generate a random token
	const resetToken = user.createPasswordResetToken();
	await user.save({ validateBeforeSave: false });

	// 3) Send it to user's email
	try {
		const resetURL = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;
		await new Email(user, resetURL, null).sendPasswordReset();

		res.status(200).json({
			status: 'success',
			message: 'Token sent to email',
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save({ validateBeforeSave: false });
		return next(
			new AppError(
				'There was an error sending the email. Try again later!',
				500
			)
		);
	}
});

exports.resetPassword = catchAsync(async (req, res, next) => {
	// 1) Get user based on token
	const hashedToken = crypto
		.createHash('sha256')
		.update(req.params.token)
		.digest('hex');

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	// 2) If token has not expired and there is user, set the new password
	if (!user) {
		return next(new AppError('Token is invalid or expired', 400));
	}
	user.password = req.body.password;
	user.passwordConfirm = req.body.passwordConfirm;
	user.newUser = false;
	user.passwordResetToken = undefined;
	user.passwordResetExpires = undefined;
	await user.save();

	// 4) Log the user in, send JWT
	createSendToken(user, 200, req, res);
});
