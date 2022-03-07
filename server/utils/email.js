const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
	constructor(user, url, event, data) {
		this.to = event ? `Madie Games <${process.env.EMAIL_FROM}>` : user.email;
		this.firstName = user.name.split(' ')[0];
		this.url = url;
		this.from = event ? user.email : `Madie Games <${process.env.EMAIL_FROM}>`;
		if (data) {
			this.game = data.game;
			this.subject = data.subject;
			this.body = data.body;
			this.password = data.password;
		}
	}

	newTransport() {
		if (process.env.NODE_ENV === 'production') {
			// Sendgrid
			return nodemailer.createTransport({
				service: 'SendGrid',
				auth: {
					user: process.env.SENDGRID_USERNAME,
					pass: process.env.SENDGRID_PASSWORD,
				},
			});
		}
		return nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD,
			},
		});
	}

	// Send the actual mail
	async send(template, subject) {
		// 1) Render
		const html = pug.renderFile(
			`${__dirname}/../views/emails/${template}.pug`,
			{
				firstName: this.firstName,
				url: this.url,
				subject,
				to: this.to,
				game: this.game,
				body: this.body,
				password: this.password,
			}
		);

		// 2) Email options
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject,
			html,
			text: htmlToText.convert(html),
		};

		// 3) Create transport and send mail

		await this.newTransport().sendMail(mailOptions, (err) => {
			if (err) {
				console.log(err);
			} else {
				console.log('Mail was sent successfully');
			}
		});
	}

	async sendWelcome() {
		await this.send('welcome', 'Welcome to the Madiee family');
	}

	async sendPasswordReset() {
		await this.send(
			'passwordReset',
			'Your password reset token (Valid for 10 mins)'
		);
	}

	async sendInvoice() {
		await this.send('invoice', 'Game Invoice');
	}

	async sendRequestAccess() {
		await this.send('requestAccess', 'Request for liscensing a game');
	}

	async sendContactUs() {
		await this.send('contactUs', this.subject);
	}
};
