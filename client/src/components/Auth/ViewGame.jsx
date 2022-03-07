import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "./Navbar";

const ViewGame = ({user}) => {
    const [width,setwidth] =useState(0)
    const [height,setheight] =useState(0)
    const [target, setTarget] = useState([]);
    const { gameid } = useParams();
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
    useEffect(() => {
        getGame();
      }, []);
    
      const getGame = async() =>{
    
        try {
          const url = `${process.env.REACT_APP_SERVER_URL}/api/games/${gameid}`;
          axios.get(url, { withCredentials: true }).then((res) => {
              setTarget(res.data.data.data);
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
      }  
      useEffect(() => {
        setwidth(Math.round((window.innerWidth * 0.85)/100)*100)
        setheight(Math.round((window.innerHeight * 0.4)/100)*100)
         }, [window.innerWidth])
  return <div>
  
  {
          target ? (<>
          <Navbar user={user}></Navbar>
          <section className="xl:px-10 lg:px-5 sm:px-2 text-gray-400 body-font bg-gray-900">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap w-full mb-20">
              <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                  Games on Uniquely Human Skills
                </h1>
                <div className="h-1 w-20 bg-indigo-500 rounded"></div>
              </div>
              <p className="lg:w-1/2 w-full leading-relaxed text-gray-400 text-opacity-90">
                Each game is designed around a theory, framework or a mental
                model, and are played to enhance the 24 human skills that people
                need to thrive in today`s rapidly evolving organisations. Our
                games help identify and enhance (i) how we think (ii) how we
                interact (iii) how we manage ourselves and (iv) how we lead, and
                thereby help people unleash their human potential. The games are
                designed for replayability, and not as a one time playable game.
                Because human skills are like muscles that need to be trained
                regularly, and not seasonally.
              </p>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className=" p-4">
                <div className="bg-gray-800 bg-opacity-40 p-6 rounded-lg">
                 <img src={`${target.image}/${width}/${height}`} alt="" />
                  <h2 className="text-lg text-white font-medium title-font">
                   {target.name}
                  </h2>
                  <h3 className="tracking-widest text-indigo-400 text-xs font-bold title-font mb-4">
                   {target.onliner}
                  </h3>
                  <p className="leading-relaxed text-base">
                   {target.description}
                  </p>
                  <iframe width={width} height={height} src={target.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
                </div>
              </div>
            </div>
            <button onClick={()=>
            {
              sendEmail(`Request Access for ${target.name}`,`Hi there, \n I am ${user.name}. \nI want to license ${target.name}. \n Thank You.`)
            }}>Request Access</button>
          </div>
        </section></>) : <></>
      }

  </div>;
};

export default ViewGame;
