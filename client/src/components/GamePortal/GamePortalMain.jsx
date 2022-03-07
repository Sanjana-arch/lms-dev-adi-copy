import { React, useEffect, useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ZoomClient from './ZoomClient';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
//import anime from 'animejs/lib/anime.es.js';
import '../../static/App.css';

const GameportalMain = (props) => {
	const [fullScreenCount, setfullScreenCount] = useState(false);
	const [btnValue, setbtnValue] = useState('FullScreen');
	var { id, hash } = useParams();

	const nameHash = btoa(unescape(encodeURIComponent(props.userName)));

	useEffect(() => {}, []);
	const goFullscreen = () => {
		const audioTitle = document
			.querySelector('.game-portal-video')
			.children[0].contentWindow.document.querySelector('.footer__inner')
			.children[0].children[0].children[0].title;
		const videoTitle = document
			.querySelector('.game-portal-video')
			.children[0].contentWindow.document.querySelector('.footer__inner')
			.children[0].children[1].children[0].title;
		// Changes the audio/video icons based on the above set titles
		if (audioTitle === 'Unmute' || audioTitle === 'Audio') {
			document
				.querySelector('.game-portal-options-icons-audio')
				.children[0].classList.remove('fa-microphone-alt');
			document
				.querySelector('.game-portal-options-icons-audio')
				.children[0].classList.add('fa-microphone-alt-slash');
		} else {
			document
				.querySelector('.game-portal-options-icons-audio')
				.children[0].classList.remove('fa-microphone-alt-slash');
			document
				.querySelector('.game-portal-options-icons-audio')
				.children[0].classList.add('fa-microphone-alt');
		}

		if (videoTitle === 'Start Video') {
			document
				.querySelector('.game-portal-options-icons-video')
				.children[0].classList.remove('fa-video');
			document
				.querySelector('.game-portal-options-icons-video')
				.children[0].classList.add('fa-video-slash');
		} else {
			document
				.querySelector('.game-portal-options-icons-video')
				.children[0].classList.remove('fa-video-slash');
			document
				.querySelector('.game-portal-options-icons-video')
				.children[0].classList.add('fa-video');
		}

		//translate Chat to right, translate video container to left , resize game iframe

		let video = document.querySelector('.game-portal-video');
		video.style.width = '15vw';
		video.style.height = '20vh';
		video.children[0].style.width = '15vw';
		video.children[0].style.height = '20vh';
		video.style.transform = 'translateX(88vw)';

		if (
			document
				.querySelector('.game-portal-video')
				.children[0].contentWindow.document.querySelector(
					'.full-screen-widget__pop-menu.dropdown-menu'
				)
		)
			document
				.querySelector('.game-portal-video')
				.children[0].contentWindow.document.querySelector(
					'.full-screen-widget__pop-menu.dropdown-menu'
				)
				.children[0].children[0].click();

		document.querySelector('.click-to-copy').style.transform =
			'translateY(-30vh)';
		document.querySelector('.game-portal-options').style.display = 'flex';
		document.querySelector('.game-portal-options').style.transform =
			'translateX(-7vw)';
		document.querySelector('.title-bar-btns').style.display = 'none';
		document.querySelector('.game-title').style.transform = 'scale(0)';
		document.querySelector('.game-portal-gameFrame').style.transform =
			' scaleX(1.15) scaleY(1.15) translateY(3.8rem) translateX(-3.2vw)';

		setbtnValue('Exit Fullscreen');
	};
	const exitFullscreen = () => {
		document.querySelector('.game-portal-gameFrame').style.transform =
			' scaleX(1) scaleY(1) translateY(0rem)';

		document.querySelector('.game-portal-video').style.display = 'flex';
		let video = document.querySelector('.game-portal-video');
		video.style.width = '25vw';
		video.style.height = '85vh';
		video.children[0].style.width = '25vw';
		video.children[0].style.height = '85vh';
		video.style.transform = 'translateX(0)';

		if (
			document
				.querySelector('.game-portal-video')
				.children[0].contentWindow.document.querySelector(
					'.full-screen-widget__pop-menu.dropdown-menu'
				)
		)
			document
				.querySelector('.game-portal-video')
				.children[0].contentWindow.document.querySelector(
					'.full-screen-widget__pop-menu.dropdown-menu'
				)
				.children[1].children[0].click();

		document.querySelector('.game-portal-options').style.display = 'none';
		document.querySelector('.title-bar-btns').style.display = 'flex';
		// document.querySelector(".click-to-fullscreen").style.transform =
		//   "translateY(0)";
		document.querySelector('.click-to-copy').style.transform = 'translateY(0)';

		document.querySelector('.game-title').style.transform = 'scale(1)';
		setbtnValue('Fullscreen');
	};

	return (
		<div className="">
			<div className="title-bar">
				{' '}
				<h1 className="text-center game-title">Game</h1>
				<div className="title-bar-btns">
					<CopyToClipboard
						className="click-to-copy"
						text={window.location.href}
					>
						<button
							onClick={() => {
								toast.success('Link Copied!');
							}}
						>
							<i className="far fa-copy"></i>
						</button>
					</CopyToClipboard>
					<button
						className="click-to-fullscreen"
						onClick={() => {
							!fullScreenCount ? goFullscreen() : exitFullscreen();
							setfullScreenCount(!fullScreenCount);
						}}
					>
						<i className="fas fa-expand-alt"></i>
					</button>
				</div>
			</div>
			<div className="game-portal-main">
				<div className="game-portal-left">
					<div className="game-portal-video">
						<iframe
							src={`${process.env.REACT_APP_CLIENT_URL}/clientView/${id}/${hash}/${nameHash}`}
							style={{ width: '25vw', height: '85vh' }}
							frameBorder="0"
						></iframe>
					</div>
					<div className="game-portal-gameFrame">
						<iframe
							src="https://fishyequilibrium.games.madiee.com/"
							frameBorder="0"
							className="game-frame"
						></iframe>
					</div>
					<div className="game-portal-options">
						<div className="game-portal-video-small"></div>
						<div className="game-portal-options-icons">
							<CopyToClipboard text={window.location.href}>
								<button
									onClick={() => {
										toast.success('Link Copied!');
									}}
								>
									<i className="far fa-copy fa-5x"></i>
								</button>
							</CopyToClipboard>
							<button
								onClick={() => {
									!fullScreenCount ? goFullscreen() : exitFullscreen();
									setfullScreenCount(!fullScreenCount);
								}}
							>
								<i className="fas fa-compress-alt fa-5x"></i>
							</button>
							<button
								className="game-portal-options-icons-video"
								onClick={() => {
									document
										.querySelector('.game-portal-video')
										.children[0].contentWindow.document.querySelector(
											'.footer__inner'
										)
										.children[0].children[1].children[0].click();
									document
										.querySelector('.game-portal-options-icons-video')
										.children[0].classList.toggle('fa-video');
									document
										.querySelector('.game-portal-options-icons-video')
										.children[0].classList.toggle('fa-video-slash');
								}}
							>
								<i className="fas fa-video fa-5x"></i>
							</button>
							<button
								className="game-portal-options-icons-audio"
								onClick={() => {
									document
										.querySelector('.game-portal-video')
										.children[0].contentWindow.document.querySelector(
											'.footer__inner'
										)
										.children[0].children[0].children[0].click();
									document
										.querySelector('.game-portal-options-icons-audio')
										.children[0].classList.toggle('fa-microphone-alt');
									document
										.querySelector('.game-portal-options-icons-audio')
										.children[0].classList.toggle('fa-microphone-alt-slash');
								}}
							>
								<i className="fas fa-microphone-alt fa-5x"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameportalMain;
