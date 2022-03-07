import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const ResetPassword = () => {
	const [pwd, setPwd] = useState('');
	const [cpwd, setCPwd] = useState('');
	const { token } = useParams();

	const resetPassword = async (e) => {
		e.preventDefault();
		try {
			const url = `${process.env.REACT_APP_SERVER_URL}/api/users/resetPassword/${token}`;
			const { data: res } = await axios.patch(
				url,
				{
					password: pwd,
					passwordConfirm: cpwd,
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
			<h3>Reset Password</h3>
			<div className="login-form-wrapper">
				<form onSubmit={resetPassword}>
					<div className="input-group">
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							name="password"
							required
							onChange={(e) => {
								setPwd(e.target.value);
							}}
						/>
					</div>
					<div className="input-group">
						<label htmlFor="passwordConfirm">Confirm Password:</label>
						<input
							type="password"
							name="confirmPassword"
							required
							onChange={(e) => {
								setCPwd(e.target.value);
							}}
						/>
					</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
