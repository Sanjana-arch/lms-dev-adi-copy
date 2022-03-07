import { React, useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import GameCard from "../admin/GameCard";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const search =(games,game)=>
{
 if(games.length){ for (let i = 0; i < games.length; i++) {
    if(games[i].game._id === game._id)
    {
      return 1;
    }
    
  }
  return 0}
  else
  {
    return 
  }
}
const ClientDashboard = ({ user }) => {
  //console.log(user);
  const [games, setGames] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [poster, setPoster] = useState([]);
  useEffect(() => {
    getGames(user);
    getAllGames();
    getPosters()
  
  }, [user]);

const getPosters = async()=>
{
  try {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/posters`;
    const res = await axios.get(url, { withCredentials: true });
   //console.log(res.data.data.data);
    setPoster(res.data.data.data.reverse());
  } catch (error) {
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status <= 500
    ) {
      console.log(error.response);
    }
  }
}

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
  const getAllGames = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/api/games`;
      await axios.get(url, { withCredentials: true }).then((res) => {
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
  //console.log(allGames);
  //console.log(games);
  console.log(games);
  return (
    <div>
      <Navbar user={user}></Navbar>
      <div className="client-ads">
        <AliceCarousel autoPlay autoPlayInterval="3000">
         {
           poster.map((element)=>{
            
             return(<img src={element.path} alt={element.title}></img>)
           
           })
         }
        </AliceCarousel>
      </div>
      <div className="client-games" style={{ margin: "1rem" }}>
        <b style={{color:"#527ed8", fontSize:25, marginLeft:6}}>Licensed Games</b>
       <div style={{display:'flex'}}>
      {
        games.length ?
        games.map((game) => {
          return <GameCard game={game.game} isLicensed={true} user={user}licensedGame={game}></GameCard>;
        })
        : 
        <p>No game</p>
      }
       </div>
      </div>
    <div>
        <b style={{color:"#527ed8", fontSize:25, marginLeft:12}}>Similar Products</b>
        <AliceCarousel mouseTracking autoWidth controlsStrategy="alternate">
          {allGames.map((game, index) => {
            if(!search(games,game))
            {
             // console.log(search(games,game));
              return <GameCard game={game} isLicensed={false} user={user}></GameCard>;}
            else return null
          })}
        </AliceCarousel>
      </div>
    </div>
  );
};

export default ClientDashboard;
