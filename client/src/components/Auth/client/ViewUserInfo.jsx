import { React, useState, useEffect } from 'react';
import axios from 'axios';

import GameRow from '../GameRow';

const ViewUserInfo = ({ user }) => {
	console.log(user);
	const [games, setGames] = useState([]);

	useEffect(() => {
		getGames(user);
	}, [user]);

	const getGames = async (user) => {
		// console.log(user);
		try {
			const url = `${process.env.REACT_APP_SERVER_URL}/api/users/${user._id}/bookings`;
			const res = await axios.get(url, { withCredentials: true });
			// console.log(res.data.data.data);
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

	return (
		<div style={{margin:'1rem'}}>
			<div className="bookings">
				<b style={{fontSize:25,color:"#527ed8"}}>Licensed Games</b>
				<table className="game-table" style={{marginTop:25}}>
					<thead>
						<tr>
							<th>Name</th>
							<th>Due Date</th>
							<th>Sessions Used</th>
							<th>Max Players</th>
						</tr>
					</thead>
					<tbody>
						{games.map((game) => {
							return <GameRow game={game} user={user}></GameRow>;
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ViewUserInfo;
