import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import AddGame from "../AddGame.jsx";
import GameRow from "./../GameRow.jsx";

const EditUserInfo = ({ User }) => {
  const { id } = useParams();
  //console.log(id);
  const [allGames, setAllGames] = useState([]);

  const [user, setUser] = useState([]);
  const [games, setGames] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pNo, setPno] = useState("");
  const [showPopup, setshowPopup] = useState(false);

  useEffect(() => {
    getUser(id);
    getGames(id);
  }, [id]);
  useEffect(() => {
    getAllGames();
    
  }, []);

  const getAllGames = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/games`;
     await axios.get(url, { withCredentials: true }).then((res) => {
        //console.log(res.data.data.data);
        setAllGames(res.data.data.data);
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

  const getUser = async (id) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/users/${id}`;
      const res = await axios.get(url, { withCredentials: true });
      // console.log(res.data.data.data);
      setUser(res.data.data.data);
      setEmail(res.data.data.data.email);
      setName(res.data.data.data.name);
      setPno(res.data.data.data.phoneNumber);
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

  const getGames = async (id) => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/users/${id}/bookings`;
      const res = await axios.get(url, { withCredentials: true });
      // console.log(res.data);
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

  const updateUser = async (e) => {
    e.preventDefault();
    // console.log(`${email} ${name} ${pNo}`);
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/users/${user._id}`;
      const { data: res } = await axios.patch(
        url,
        {
          email,
          name,
          phoneNumber: pNo,
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
    <div>
      <div className="info-form">
        <h2 style={{marginLeft:14,marginTop:15,fontSize:25}}><b>Edit User Info</b></h2>
        <div className="info-form-wrapper">
          <form onSubmit={updateUser}>
            <div className="input-group">
              <label htmlFor="email"><b>Email:</b></label>
              <input
                type="email"
                name="email"
                id="email"
                required
                defaultValue={user.email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="name"><b>Name:</b></label>
              <input
                type="text"
                name="name"
                id="name"
                required
                defaultValue={user.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="phoneNumber"><b>Phone Number:</b></label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                required
                defaultValue={user.phoneNumber}
                onChange={(e) => {
                  setPno(e.target.value);
                }}
              />
            </div>
            <div className="input-group">
              <label htmlFor="games"><b>Number of games:</b></label>
              <input type="number" name="games" value={games.length} readOnly />
            </div>
            <button type="submit" style={{marginLeft:12,marginBottom:15}}>Save</button>
          </form>
        </div>
      </div>
      <div className="bookings">
        <center>
        <table className="game-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Due Date</th>
              <th>Sessions</th>
              <th>Max Players</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => {
              return <GameRow game={game} user={User}></GameRow>;
            })}
          </tbody>
        </table>
        </center>
      </div>
      <center>
      <button style={{marginTop:15}}
        onClick={() => {
          setshowPopup(true);
        }}
      >
        Add Game
      </button>
      </center>
      {showPopup ? <AddGame hide={setshowPopup} games={allGames} user={user} licensed={games}></AddGame> : <></>}
    </div>
  );
};

export default EditUserInfo;
