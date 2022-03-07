import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import { ZoomMtg } from "@zoomus/websdk";
import axios from "axios";
const ZoomMtg = window.ZoomMtg;
const ZoomAdmin = () => {
	var signature;
	const getSign = (ID, role) => {
		var data = JSON.stringify({
			meetingNumber: ID,
			role: 0,
		});

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SERVER_URL}/api/users/getsignature`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

		var res = axios(config)
			.then(function (response) {
				return JSON.stringify(response.data.signature);
			})
			.catch(function (error) {
				console.log(error);
			});
		return res;
	};

	var { id, hash, nameHash } = useParams();

	const decodePwd = (hash) => {
		return decodeURIComponent(escape(window.atob(hash)));
	};
	const decodeName = (nameHash) => {
		return decodeURIComponent(escape(window.atob(nameHash)));
	};

	useEffect(async () => {
		showDiv();
		signature = await getSign(id, 0);
		//console.log(`hello${signature}`);
		ZoomMtg.setZoomJSLib('https://source.zoom.us/2.1.1/lib', '/av');
		ZoomMtg.preLoadWasm();
		ZoomMtg.prepareWebSDK();
		intializeMeeting();
	}, []);
	const showDiv = () => {
		document.querySelector('#zmmtg-root').style.display = 'block';
	};
	const intializeMeeting = () => {
		ZoomMtg.init({
			leaveUrl: `${process.env.REACT_APP_CLIENT_URL}/clientView/${id}/${hash}/amlp`,
			isSupportAV: true,
			success: (success) => {
				console.log(success);

				ZoomMtg.join({
					signature,
					meetingNumber: id,
					userName: decodeName(nameHash) || 'adi',
					apiKey: 'AZkSjEPDSACKGhNQZO5dNQ',
					userEmail: 'sasd@gmail.com',
					passWord: decodePwd(hash),
					success: (success) => {
						console.log(success);
						if (
							document.querySelector(
								'.full-screen-widget__pop-menu.dropdown-menu'
							)
						)
							document
								.querySelector('.full-screen-widget__pop-menu.dropdown-menu')
								.children[1].children[0].click();
					},
					error: (error) => {
						console.log(error);
					},
				});
			},
			error: (error) => {
				console.log(error);
			},
		});
	};
	return <div></div>;
};

export default ZoomAdmin;
