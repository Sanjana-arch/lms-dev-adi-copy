import React, { useState, useEffect } from 'react';
import './static/index.css';
import Routes from './Routes';
import { Toaster, toast } from 'react-hot-toast';
import NotFound from './components/NotFound';
import axios from 'axios';
const verifyJWT = async (setauth, setUser) => {
	const result = await axios.get(
		`${process.env.REACT_APP_SERVER_URL}/api/checkToken`,
		{ withCredentials: true }
	);
	if (result.data.error === 'Not found') {
		console.log(result.data.error);
		setauth(false);
	}
	if (result.data.user) {
		console.log(result.data.user);
		setauth(true);
		setUser(result.data.user);
	}
	/* if (result.data.error) {
			console.log(result.data.error);
			toast.error(result.data.error);
			setauth(false);
		}
		if (result.data.user) {
			sessionStorage.setItem('user', JSON.stringify(result.data.user));
			setauth(true);
		}
		setauth(false);  */
};
const App = () => {
	const [auth, setauth] = useState(undefined);
	const [user, setUser] = useState({});
	const delay = () => {
		setTimeout(() => {
			return <NotFound></NotFound>;
		}, 3000);
	};

	useEffect(() => {
		if(!auth){verifyJWT(setauth, setUser);}
	}, []);
	return (
		<div>
			<Toaster position="top-right" reverseOrder={true} />
			{auth !== undefined ? (
				<Routes
					auth={auth}
					user={user}
					setUser={setUser}
					setauth={setauth}
				></Routes>
			) : (
				delay()
			)}
		</div>
	);
};

export default App;
