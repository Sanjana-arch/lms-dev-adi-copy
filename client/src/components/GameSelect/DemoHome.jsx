import { React, useState, useEffect } from 'react';
import homedata from './HomeData';
import axios from 'axios';
import swal from 'sweetalert';
import { Toaster, toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function clipBoard(e) {
	// navigator.clipboard.writeText(document.getElementById(e).value);
	if (document.getElementById(e).value === 'Generate URL') {
		toast.error('Please enter meeting details');
	} else {
		navigator.clipboard.writeText(document.getElementById(e).value);
		toast.success('Link Copied !');
	}
}

function DemoHome() {
	const [meetingID, setmeetingID] = useState('');
	const [meetingPwd, setmeetingPwd] = useState('');
	const [width, setwidth] = useState(0);
	const [height, setheight] = useState(0);
	const [target, setTarget] = useState([]);
	const { gameid } = useParams();

	useEffect(() => {
		getGame();
	}, []);

	const getGame = async () => {
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
	};

	function openLink(e) {
		if (document.getElementById(e).value === 'Generate URL') {
			toast.error('Please enter meeting details');
		} else {
			swal({
				title: 'Are you sure?',
				text: 'You want to leave this page',
				icon: 'warning',
				buttons: true,
				dangerMode: true,
			}).then((willDelete) => {
				if (willDelete) {
					window.open(
						`${process.env.REACT_APP_CLIENT_URL}/admin/${meetingID}/${btoa(
							unescape(encodeURIComponent(meetingPwd))
						)}/${gameid}`
					);
				}
			});
		}
	}
	function generateLink(e) {
		if (meetingID.length > 0 && meetingPwd.length > 0) {
			/* var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(meetingPwd), 'R8Bd1ogokT').toString();
        console.log(ciphertext);*/
			var url =
				process.env.REACT_APP_CLIENT_URL +
				'/user/' +
				meetingID +
				'/' +
				btoa(unescape(encodeURIComponent(meetingPwd))) +
				'/' +
				gameid;
			//console.log(window.location.href+'user/'+meetingID+'/'+);
			document.getElementById(e).value = `${url}`;
			toast.success('Link Generated !');
		}
		// document.getElementById(e).value = homedata[val].link + '/' + makeID(10);
		else {
			toast.error('Please enter meeting details');
		}
	}
	useEffect(() => {
		setwidth(Math.round((window.innerWidth * 0.85) / 100) * 100);
		setheight(Math.round((window.innerHeight * 0.4) / 100) * 100);
	}, [window.innerWidth]);

	//console.log(`${width} ${height}`);
	console.log(target);
	return (
		<div>
			{target ? (
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
									<iframe
										width={width}
										height={height}
										src={target.video}
										title="YouTube video player"
										frameborder="0"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowfullscreen
									></iframe>
									<div className="flex md:mt-4 mt-6">
										<input
											title="meetingID"
											placeholder="MeetingID"
											className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-1 mr-1 leading-8 transition-colors duration-200 ease-in-out"
											value={meetingID}
											onChange={(e) => {
												setmeetingID(e.target.value);
											}}
										></input>
										<input
											title="meetingPwd"
											placeholder="Password"
											className="bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 px-1 mr-1 leading-8 transition-colors duration-200 ease-in-out"
											value={meetingPwd}
											onChange={(e) => {
												setmeetingPwd(e.target.value);
											}}
										></input>
										<button
											className="inline-flex text-white bg-indigo-500 border-0 py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded"
											onClick={() => generateLink('hero-field-0', 0)}
										>
											Generate Link
										</button>
										{/* <a className="text-indigo-400 inline-flex items-center ml-4">Learn More
                                              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                                                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                                              </svg>
                                          </a> */}
									</div>
									<div className="hidden-button">
										<div className="flex w-full items-end mt-6">
											<div className="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
												<label
													for="hero-field"
													className="leading-7 text-sm text-gray-300"
												>
													Link
												</label>
												<input
													type="text"
													value="Generate URL"
													id="hero-field-0"
													name="hero-field"
													className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-400 px-3 leading-8 transition-colors duration-200 ease-in-out"
													readonly
												/>{' '}
												{/*py-1*/}
											</div>
											{/* <button className="inline-flex text-white bg-indigo-500 border-0 py-1 px-4 focus:outline-none hover:bg-indigo-600 rounded" onClick={() => clipBoard('hero-field-0')}>Copy to Clipboard</button> */}
											<div className="flex justify-center">
												<button
													className="inline-flex text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
													onClick={() => clipBoard('hero-field-0')}
												>
													Copy to Clipboard
												</button>
												<button
													className="ml-2 inline-flex text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-sm"
													onClick={() => openLink('hero-field-0')}
												>
													Open
												</button>
											</div>
										</div>
										<p className="text-sm mt-2 text-gray-500 w-full">
											Neutra shabby chic ramps, viral fixie.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			) : (
				<></>
			)}
		</div>
	);
}

export default DemoHome;
