import React from 'react';
import homedata from './HomeData';
import { useParams } from 'react-router-dom';

function handleSubmit(e) {
	e.preventDefault();
	console.log('You clicked submit.');
}

function clickFunction() {
	document.getElementById('hero-field').value = 'https://www.madiee.com/';
}

function Home() {
	const { gameid } = useParams();
	return (
		<div>
			<section class="text-gray-400 bg-gray-900 body-font overflow-hidden">
				<div class="container px-5 py-24 mx-auto">
					<div class="-my-8 divide-y-2 divide-gray-800">
						{homedata.map((homedata, i) => (
							<div class="py-8 flex flex-wrap md:flex-nowrap">
								<div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
									{/* <span class="font-semibold title-font text-white">{homedata.image}</span> */}
									<img
										src={homedata.image}
										className="px-5"
										alt="Game_IMG"
										width="500"
										height="500"
									/>
									{/* <span class="mt-1 text-gray-500 text-sm">12 Jun 2019</span> */}
								</div>
								<div class="md:flex-grow px-10">
									<h2 class="text-2xl font-medium text-white title-font mb-2">
										{homedata.title}
									</h2>
									<p class="leading-relaxed">{homedata.description}</p>
									<button class="text-indigo-400 inline-flex items-center mt-4">
										Generate Link
										<svg
											class="w-4 h-4 ml-2"
											viewBox="0 0 24 24"
											stroke="currentColor"
											stroke-width="2"
											fill="none"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path d="M5 12h14"></path>
											<path d="M12 5l7 7-7 7"></path>
										</svg>
										{/* <div class="hidden-button">
                                            <div class="flex w-full justify-center items-end">
                                                <div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
                                                    <label for="hero-field" class="leading-7 text-sm text-gray-400">Link</label>
                                                    <input type="text" value="can't touch this" id="hero-field" name="hero-field" class="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readonly/>
                                                </div>
                                                <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Copy to Clipboard</button>
                                            </div>
                                            <p class="text-sm mt-2 text-gray-500 mb-8 w-full">Neutra shabby chic ramps, viral fixie.</p>
                                        </div> */}
									</button>
									<div class="hidden-button">
										<div class="flex w-full justify-center items-end">
											<div class="relative mr-4 lg:w-full xl:w-1/2 w-2/4 md:w-full text-left">
												<label
													for="hero-field"
													class="leading-7 text-sm text-gray-400"
												>
													Link
												</label>
												<input
													type="text"
													value="can't touch this"
													id="hero-field"
													name="hero-field"
													class="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-indigo-900 focus:bg-transparent focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
													readonly
												/>
											</div>
											<button
												class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
												onClick={clickFunction}
											>
												Copy to Clipboard
											</button>
										</div>
										<p class="text-sm mt-2 text-gray-500 mb-8 w-full">
											Neutra shabby chic ramps, viral fixie.
										</p>
									</div>
								</div>
							</div>
						))}

						{/* <div class="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap">
                            <div class="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                <span class="font-semibold title-font text-white">CATEGORY</span>
                                <span class="mt-1 text-gray-500 text-sm">12 Jun 2019</span>
                            </div>
                            <div class="md:flex-grow">
                                <h2 class="text-2xl font-medium text-white title-font mb-2">Woke master cleanse drinking vinegar salvia</h2>
                                <p class="leading-relaxed">Glossier echo park pug, church-key sartorial biodiesel vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon party messenger bag selfies, poke vaporware kombucha lumbersexual pork belly polaroid hoodie portland craft beer.</p>
                                <a class="text-indigo-400 inline-flex items-center mt-4">Learn More
                                    <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M5 12h14"></path>
                                        <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div> */}
					</div>
				</div>
			</section>
		</div>
	);
}

export default Home;
