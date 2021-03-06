const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
	console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
	console.log(err.name, err.message);
	process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./index');

// MongoDB
const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((con) => console.log('DB connection successful....'));

// Server
const port = process.env.PORT || 8080;

const server = app.listen(port, () => {
	console.log(`Server running on port ${port}....`);
});

process.on('unhandledRejection', (err) => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err);
	server.close(() => {
		process.exit(1);
	});
});

process.on('SIGTERM', () => {
	console.log('(╬▔皿▔)╯ SIGTERM RECEIVED (╬▔皿▔)╯ . Shutting down...');
	server.close(() => {
		console.log('💢 Process terminated! 💢');
	});
});
