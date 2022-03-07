const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const authController = require('./controllers/authController');
const userRouter = require('./routes/userRoutes');
const gameRouter = require('./routes/gameRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const posterRouter = require('./routes/posterRoutes');

const app = express();
app.enable("trust proxy")

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// Set security HTTP headers
app.use(helmet());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Dev logging
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Limit reqs from same API
const limiter = rateLimit({
	max: 200,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour',
});
app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization againsst XSS
app.use(xss());

// G-zip compression
app.use(compression());

//routes
app.post('/api/v1/auth/google', authController.googleLogin);
app.get('/api/checkToken', authController.isLoggedIn, function (req, res) {
	if (res.user)
		res.json({
			user: res.user,
		});
	else
		res.json({
			error: 'Not found',
		});
});
app.use('/api/users', userRouter);
app.use('/api/games', gameRouter);
app.use('/api/bookings', bookingRouter);
app.use('/api/posters', posterRouter);

app.all('*', (req, res, next) => {
	next(new AppError(`Can not find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
