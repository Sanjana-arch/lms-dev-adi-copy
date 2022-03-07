import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
import '../../../static/App.css';

const AdminGameLanding = () => {
	var { id, hash } = useParams();
	const [videoBtn, setvideoBtn] = useState(false);
	const [gameBtn, setGameBtn] = useState(false);
	const [videoBtnValue, setvideoBtnValue] = useState('Expand Video');
	const [gameBtnValue, setgameBtnValue] = useState('Expand Game');
	const videoFullScreen = () => {
		document.querySelector('.admin-game-iframe').style.display = 'none';
		document.querySelector('.admin-game-portal-title').style.display = 'none';
		document.querySelector('.admin-expand-game').style.display = 'none';
		document.querySelector('.admin-video-iframe').style.width = '90vw';
		document.querySelector('.admin-video-iframe').style.height = '90vh';
	};
	const exitVideoFullScreen = () => {
		document.querySelector('.admin-game-iframe').style.display = 'block';
		document.querySelector('.admin-game-portal-title').style.display = 'block';
		document.querySelector('.admin-expand-game').style.display = 'block';
		document.querySelector('.admin-video-iframe').style.width = '40vw';
		document.querySelector('.admin-video-iframe').style.height = '80vh';
	};
	const gameFullScreen = () => {
		document.querySelector('.admin-video-iframe').style.display = 'none';
		document.querySelector('.admin-game-portal-title').style.display = 'none';
		document.querySelector('.admin-expand-video').style.display = 'none';
		document.querySelector('.admin-game-iframe').style.width = '90vw';
		document.querySelector('.admin-game-iframe').style.height = '90vh';
	};
	const exitgameFullScreen = () => {
		document.querySelector('.admin-video-iframe').style.display = 'block';
		document.querySelector('.admin-game-portal-title').style.display = 'block';
		document.querySelector('.admin-expand-video').style.display = 'block';
		document.querySelector('.admin-game-iframe').style.width = '55vw';
		document.querySelector('.admin-game-iframe').style.height = '80vh';
	};
	return (
		<div className="admin-game-portal">
			<div className="admin-game-portal-title">
				<h1>Game</h1>
			</div>
			<div className="admin-game-portal-main">
				<iframe
					src={`${process.env.REACT_APP_CLIENT_URL}/clientView/${id}/${hash}/amlp`}
					style={{ width: '40vw', height: '80vh' }}
					className="admin-video-iframe"
					frameBorder="0"
				></iframe>
				<iframe
					src="https://fishyequilibrium.games.madiee.com/"
					style={{ width: '55vw', height: '80vh' }}
					className="admin-game-iframe"
					frameBorder="0"
				></iframe>
			</div>
			<div className="admin-game-portal-controls">
				<button
					className="admin-expand-video"
					onClick={() => {
						if (!videoBtn) {
							videoFullScreen();
							setvideoBtnValue('Exit video fullscreen');
						} else {
							exitVideoFullScreen();
							setvideoBtnValue('Expand Video');
						}
						setvideoBtn(!videoBtn);
					}}
				>
					{videoBtnValue}
				</button>
				<button
					className="admin-expand-game"
					onClick={() => {
						if (!gameBtn) {
							gameFullScreen();
							setgameBtnValue('Exit game fullscreen');
						} else {
							// colllapse game
							exitgameFullScreen();
							setgameBtnValue('Expand Game');
						}
						setGameBtn(!gameBtn);
					}}
				>
					{gameBtnValue}
				</button>
				<CopyToClipboard
					className="click-to-copy"
					text={window.location.href.replace('admin', 'user')}
				>
					<button
						onClick={() => {
							toast.success('Link Copied!', {
								position: 'top-right',
							});
						}}
					>
						<i className="far fa-copy"></i>
					</button>
				</CopyToClipboard>
				<Toaster />
			</div>
		</div>
	);
};

export default AdminGameLanding;
