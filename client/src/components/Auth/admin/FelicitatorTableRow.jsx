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


const FelicitatorTableRow = ({user}) => {
    const [games, setGames] = useState([]);

	useEffect(() => {
		getGames(user, setGames);
	}, []);
    return (
      
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber ? user.phoneNumber : "Nil"}</td>
                <td>{user.role}</td>
               
                <td>{games.length > 0 ? (
					<div>
						{games.map((game) => {
							return <p>{game.game.name},</p>;
						})}
					</div>
				) : (
					'Nil'
				)}</td>
                <td>
                  {" "}
                  <Link to={`/userInfo/${user._id}`}>
                    <button style={{paddingTop:0,paddingBottom:0,marginTop:5,marginBottom:5}}>Edit</button>
                  </Link>
                </td>
              </tr>

    )
}

export default FelicitatorTableRow
