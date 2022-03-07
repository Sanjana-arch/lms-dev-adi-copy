import { useState } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');

	const resetPassword = async (e) => {
		e.preventDefault();
		try {
			const url = `${process.env.REACT_APP_SERVER_URL}/api/users/forgotPassword`;
			const { data: res } = await axios.post(
				url,
				{
					email,
				},
				{ withCredentials: true }
			);
			//
			toast.success(res.status);
			console.log(res);
			window.location.replace('/login');
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				console.log(error.response);
				toast.error(error.response.data.message);
			}
		}
	};

	return (
		<div className="login-form">
			<h3>RESET YOUR PASSWORD</h3>
			<div className="login-form-wrapper">
				<form onSubmit={resetPassword}>
					<div className="input-group">
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							name="email"
							required
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassword;
