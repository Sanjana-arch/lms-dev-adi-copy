import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const getGames = async (user, setGames) => {
	try {
		const url = `${process.env.REACT_APP_SERVER_URL}/api/users/${user._id}/bookings`;
		const res = await axios.get(url, { withCredentials: true });
		setGames(res.data.data.data);
	} catch (error) {
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status <= 500
		) {
			console.log(error.response);
		}
	}
};

const FelicitatorCard = ({ user }) => {
	// console.log(user);
	const [games, setGames] = useState([]);

	useEffect(() => {
		getGames(user, setGames);
	}, []);
	return (
		<div className="felicitator-card">
			<div className="fel-card-s1">
				<h1>{user.name}</h1>
				<Link to={`/userInfo/${user._id}`}>
					<button>
						<i class="fas fa-external-link-alt"></i>
					</button>
				</Link>
			</div>
			<div className="fel-card-s2">
				<p>{user.email}</p>
			</div>
			<div className="fel-card-s2">
				<p>{user.role}</p>
			</div>
			<div className="fel-card-s2">
				<p>{user.phoneNumber ? user.phoneNumber : 'Nil'}</p>
			</div>
			{/* <div className="fel-card-s2">
               <p>Valid till : {user.date}</p>
           </div> */}
			<div className="fel-card-s3">
				<h3>Games : </h3>
				{games.length > 0 ? (
					<div className="fel-card-s3-games">
						{games.map((game) => {
							return <p>{game.game.name},</p>;
						})}
					</div>
				) : (
					'Nil'
				)}
			</div>
		</div>
	);
};

export default FelicitatorCard;
