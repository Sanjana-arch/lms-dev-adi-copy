import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import toast from "react-hot-toast";

const GameCard = ({ game, isLicensed, licensedGame,user}) => {
  useEffect(() => {}, []);

  const sendEmail = async(subject,body)=>
  {
    toast("Sending Mail")
    try {
      var res =  await axios.post(
         `${process.env.REACT_APP_SERVER_URL}/api/users/sendEmail`,
         {
           email: user.email,
           subject,
           body,
         }
       );
       console.log(res);
       if(res.data.error )
       {
         toast.error(res.data.error)
       }
       else
       {
         toast.success(res.data.msg)
       }
     } catch (error) {
       console.error(error);
       toast.error(error)
     }
  }
  return (
    <div className="game-card">
      <img src={`${game.image}/300/200`}></img>
      {isLicensed ? (
        <button
          onClick={() => {
           if(licensedGame.sessions > 0)
           {
            window.location.href = `${process.env.REACT_APP_CLIENT_URL}/games/createSession/${game._id}`;
           }
           else
           {
            swal({
                title: "Please contact Madiee",
                text: "You are either out of sessions or past your due date \n Click on OK to request renewal",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                sendEmail(`Renewal for ${game.name}`,`Hi there,\n I am ${user.name}. I want to renew my license for ${game.name}.\n Thank You`)
                }
              });
              
           }
          }}
        >
          {game.name}
        </button>
      ) : (
        <a
          href={`${process.env.REACT_APP_CLIENT_URL}/games/viewGame/${game._id}`}
        >
          {game.name}
        </a>
      )}
    </div>
  );
};

export default GameCard;
