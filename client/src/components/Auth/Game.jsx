import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import GameCard from './admin/GameCard';
const Game = ({ user }) => {
	// const user = JSON.parse(sessionStorage.getItem('user'))
	const [games, setgames] = useState([]);
	useEffect(() => {
		getGames();
	}, []);
	const getGames = async () => {
		try {
			const url = `${process.env.REACT_APP_SERVER_URL}/api/games`;
			axios.get(url, { withCredentials: true }).then((res) => {
				setgames(res.data.data.data);
			});
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
	console.log(games);
	return (
		<div className="game-store">
			<Navbar></Navbar>
			<h2>Games we offer</h2>
			<div className="game-store-wrapper">
				{games.map((game) => {
					return <GameCard game={game} user={user}></GameCard>;
				})}
			</div>
		</div>
	);
};

export default Game;
