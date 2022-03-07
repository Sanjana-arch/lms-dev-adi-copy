import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const AddGame = ({ hide, games, licensed, user }) => {
  //console.log(games);
  const [newGame, setNewGame] = useState("");
  const [newDate, setNewDate] = useState("");
  const [sessions, setsessions] = useState(0);
  const [players, setplayers] = useState(0);
  const [target, setTarget] = useState([]);
  //console.log(licensed);
  const filterGames = (licensed, game) => {
    for (let i = 0; i < licensed.length; i++) {
      if (licensed[i].game._id === game._id) return 0;
    }
    return 1;
  };

  const addNewGame = async () => {
    //console.log(`${newGame} ${new Date(newDate)} ${sessions} ${players}`);

    console.log(target);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/bookings`,
        {
          game: target,
          user,
          timeLimit: new Date(newDate),
          sessions,
          maxPlayers: players,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res.data.status === "success") {
        toast.success("success");
        hide(false);
        window.location.reload();
      } else {
        toast.error(res.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const getGame = async (gameid) => {
    console.log(gameid);
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/games/${gameid}`;
      axios.get(url, { withCredentials: true }).then((res) => {
        setTarget(res.data.data.data);
        // console.log(res.data.data);
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
  return (
    <div className="popup">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="login-form"
      >
        <div className="games-option">
          <label htmlFor="games">Choose a game:</label>
          <select
            name="games"
            id=""
            onChange={(e) => {
              setNewGame(e.target.value);
              getGame(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="" defaultChecked>
              None
            </option>
            {games.map((game) => {
              if (filterGames(licensed, game)) {
                return (
                  <option value={game._id} style={{ width: "100px" }}>
                    {game.name}
                  </option>
                );
              } else {
                return <></>;
              }
            })}
          </select>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date : </label>
          <input
            type="date"
            onChange={(e) => {
              setNewDate(e.target.value);
            }}
            name="dueDate"
            id=""
          />
        </div>
        <div>
          <label htmlFor="sessions">Number of sessions : </label>
          <input
            type="number"
            min={0}
            onChange={(e) => {
              setsessions(e.target.value);
            }}
            name="sessions"
            id=""
          />
        </div>
        <div>
          <label htmlFor="maxPlayers">Number of max players : </label>
          <input
            type="number"
            min={0}
            onChange={(e) => {
              setplayers(e.target.value);
            }}
            name="maxPlayers"
            id=""
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (
              newGame.length &&
              newDate.length &&
              sessions > 0 &&
              players > 0
            ) {
              if (new Date() <= new Date(newDate)) {
                addNewGame();
              } else {
                toast.error("Enter valid date");
              }
            } else toast.error("Enter valid data");
          }}
        >
          Add
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            hide(false);
          }}
        >
          Close
        </button>
      </form>
    </div>
  );
};

export default AddGame;
