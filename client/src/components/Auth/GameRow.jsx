import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {BiTrashAlt} from 'react-icons/bi'
import {FiSave} from 'react-icons/fi'

const GameRow = ({ game, user }) => {
	const [timeLimit, setTimeLimit] = useState('');
	const [sessions, setSessions] = useState('');
	const [maxPlayers, setMaxPlayers] = useState('');

	useEffect(() => {
		setTimeLimit(game.timeLimit);
		setSessions(game.sessions);
		setMaxPlayers(game.maxPlayers);
		//console.log(game);
	}, []);

	const deleteBooking = async ()=>
	{
		try {
			const url = `${process.env.REACT_APP_SERVER_URL}/api/bookings/${game._id}`;
			const { data: res } = await axios.delete(
				url,
				{ withCredentials: true }
			);
			//
			toast.success("Game Deleted");

		window.location.reload()

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
	}
	const updateBooking = async () => {
		// console.log(`${timeLimit} ${sessions} ${maxPlayers}`);
		try {
			const url = `${process.env.REACT_APP_SERVER_URL}/api/bookings/${game._id}`;
			const { data: res } = await axios.patch(
				url,
				{
					timeLimit,
					sessions,
					maxPlayers,
				},
				{ withCredentials: true }
			);
			//
			toast.success(res.status);
			console.log(res);
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
		<tr>
			<td>
				<input
					type="text"
					name="name"
					required
					defaultValue={game.game.name}
					readOnly
					style={{textAlign:"center"}}
				/>
			</td>

			<td>
				{user.role === 'admin' ? (
					<input
						type="text"
						name="timeLimit"
						required
						style={{textAlign:"center"}}
						defaultValue={new Date(game.timeLimit).getDate()+ '-'+(new Date(game.timeLimit).getMonth()+1)+'-' +new Date(game.timeLimit).getFullYear()}
						onChange={(e) => {
							setTimeLimit(e.target.value);
						}}
					/>
				) : (
					<input
						type="text"
						name="timeLimit"
						required
						style={{textAlign:"center"}}
						defaultValue={new Date(game.timeLimit).getDate()+ '-'+(new Date(game.timeLimit).getMonth()+1)+'-' +new Date(game.timeLimit).getFullYear()}
						readOnly
					/>
				)}
			</td>
			<td>
				{user.role === 'admin' ? (
					<input
						type="number"
						name="sessions"
						min={0}
						required
						style={{textAlign:"center"}}
						defaultValue={game.sessions}
						onChange={(e) => {
							setSessions(e.target.value);
						}}
					/>
				) : (
					<input
						type="number"
						name="sessions"
						required
						style={{textAlign:"center"}}
						defaultValue={game.sessions}
						readOnly
					/>
				)}
			</td>
			<td>
				{user.role === 'admin' ? (
					<input
						type="number"
						name="maxPlayers"
						min={0}
						required
						style={{textAlign:"center"}}
						defaultValue={game.maxPlayers}
						onChange={(e) => {
							setMaxPlayers(e.target.value);
						}}
					/>
				) : (
					<input
						type="number"
						name="maxPlayers"
						required
						style={{textAlign:"center"}}
						defaultValue={game.maxPlayers}
						readOnly
					/>
				)}
			</td>
			{user.role === 'admin' ? (
				<td>
					<button onClick={updateBooking}><FiSave></FiSave></button>
				</td>
			) : (
				<td></td>
			)}
			{user.role === 'admin' ? (
				<td>
					<button onClick={deleteBooking}><BiTrashAlt></BiTrashAlt></button>
				</td>
			) : (
				<td></td>
			)}
			{
				user.role !== 'admin'?
				<td>
				<Link to={`/games/createSession/${game.game._id}`}>
					<button style={{paddingTop:0,paddingBottom:0,marginTop:5,marginBottom:5}}>Play</button>
				</Link>
			</td>
			: <></>
			}
		</tr>
	);
};

export default GameRow;
