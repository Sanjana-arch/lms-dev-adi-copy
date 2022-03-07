import React, { useState, useEffect } from "react";
import Gameportal from "./GamePortalMain";
import { Toaster, toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

import "../../static/App.css";

const GamePortalLanding = () => {
  const [name, setName] = useState("");
  const [MeetingID, setMeetingID] = useState("");
  const [MeetingPassword, setMeetingPassword] = useState("");
  const [btnCount, setbtnCount] = useState(false);
  const [permission, setpermission] = useState(false);
  const decodePwd = (hash) => {
    return decodeURIComponent(escape(window.atob(hash)));
  };

  var { id, hash } = useParams();
  useEffect(() => {
    setMeetingID(id);
    setMeetingPassword(decodePwd(hash));
    //console.log(`${MeetingID} ${MeetingPassword}`);
    if (name.length !== 0) {
      setpermission(true);
    } else {
      setpermission(false);
    }
  }, [name, MeetingID, MeetingPassword]);
  return (
    <div className="game-portal">
      <div>
        <Toaster position="top-right" reverseOrder={true} />
      </div>
      {!btnCount ? (
        <section class="text-gray-400 bg-gray-900 body-font relative">
          <div class="container px-5 py-24 mx-auto">
            <div class="flex flex-col text-center w-full mb-12">
              <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">User Login</h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-base">Enter Meeting Details</p>
            </div>
            <div class="lg:w-1/2 md:w-2/3 mx-auto">
              <div class="flex flex-wrap -m-2">
                <div class="p-2 w-full">
                  <div class="relative">
                    {/* <label for="name" class="leading-7 text-sm text-gray-400">Enter Your Name</label> */}
                    <input type="text"
                      value={name}
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                        console.log(name);
                      }}
                      placeholder="Enter your name" id="name" name="name" class="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div class="p-2 w-full">
                  <button onClick={() => {
                    console.log(name);

                    if (permission) {
                      setbtnCount(true);
                      console.log(name.length);
                    } else {
                      toast.error("Please Enter Meeting Details.");
                    }
                  }} class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Join</button>
                </div>
                <div class="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
                  <a class="text-indigo-400">example@email.com</a>
                  <p class="leading-normal my-5">49 Smith St.
                    <br />©MADIEE Games 2022
                  </p>
                  <span class="inline-flex">
                    <a class="text-gray-500">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a class="ml-4 text-gray-500">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a class="ml-4 text-gray-500">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                      </svg>
                    </a>
                    <a class="ml-4 text-gray-500">
                      <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Gameportal
          userName={name}
          MeetingID={MeetingID}
          MeetingPassword={MeetingPassword}
        />
      )}
    </div>
     );
};

export default GamePortalLanding;
