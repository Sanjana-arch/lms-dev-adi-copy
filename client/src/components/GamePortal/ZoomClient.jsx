import React from "react";
import { useState, useEffect } from "react";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";

import axios from "axios";
const Zoom = (props) => {
  const client = ZoomMtgEmbedded.createClient();
  const [signature, setsignature] = useState("");

  const getSign = async (ID, role) => {
    var data = JSON.stringify({
      meetingNumber: ID,
      role: 0,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/getsignature`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data.signature));
        setsignature(JSON.stringify(response.data.signature));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //  console.log(`${signature} api`);
  useEffect(() => {
    getSign(props.data.MeetingID, 0);
  }, [props.data.MeetingID]);
  let meetingSDKElement = document.getElementById("meetingSDKElement");

  //console.log(typeof(signature));
  client.init({
    debug: true,
    zoomAppRoot: meetingSDKElement,
    language: "en-US",
    customize: {
      meetingInfo: [
        "topic",
        "host",
        "mn",
        "pwd",
        "telPwd",
        "invite",
        "participant",
        "dc",
        "enctype",
      ],
      toolbar: {
        buttons: [
          {
            text: "Custom Button",
            className: "CustomButton",
            onClick: () => {
              console.log("custom button");
            },
          },
        ],
      },
    },
  });
  console.log(signature);
  client.join({
    apiKey: "AZkSjEPDSACKGhNQZO5dNQ",
    signature: signature, // role in signature needs to be 1
    meetingNumber: props.data.MeetingID,
    password: props.data.MeetingPassword,
    userName: props.data.userName,
  });

  return <div id="meetingSDKElement"></div>;
};

export default Zoom;
