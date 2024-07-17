import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { FaCopy } from 'react-icons/fa';

import './detailsBanner.scss';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useFetch from '../../../hooks/useFetch';
import Genres from '../../../components/genres/Genres';
import CircleRating from '../../../components/circleRating/CircleRating';
import Img from '../../../components/lazyLoadImage/Img.jsx';
import PosterFallback from '../../../assets/no-poster.png';
import { PlayIcon } from '../PlayIcon.jsx';
import VideoPopup from '../../../components/videoPopup/VideoPopup.jsx';

const DetailsBanner = ({ video, crew }) => {
	const [show, setShow] = useState(false);
	const [videoId, setVideoId] = useState(null);
	const [showToaster, setShowToaster] = useState(false);

	// console.log(video);

	const { id, mediaType } = useParams();
	const { data, loading } = useFetch(`/${mediaType}/${id}`);

	const name = data?.name || data?.title || data?.original_name;

	const { url } = useSelector((state) => state.home);

	const toHoursAndMinutes = (totalMinutes) => {
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
	};

	const _genres = data?.genres?.map((g) => g?.id);

	const director = crew?.filter(
		(f) => f?.job === 'Director' || f?.job === 'Assistant Director',
	);
	const writer = crew?.filter(
		(f) =>
			f.job === 'Screenplay' ||
			f.job === 'Script' ||
			f.job === 'Story' ||
			f.job === 'Writing' ||
			f.job === 'Writer' ||
			f.job === 'Screenstory' ||
			f.job === 'Teleplay' ||
			f.job === 'Theatre Play',
	);

	const producer = crew?.filter(
		(f) =>
			f.job === 'Producer' ||
			f.job === 'Executive Producer' ||
			f.job === 'Line Producer' ||
			f.job === 'Executive Producer' ||
			f.job === 'Production Coordinator' ||
			f.job === 'Production Manager' ||
			f.job === 'Unit Production Manager' ||
			f.job === 'Co-Producer',
	);

	const handleCopy = () => {
		navigator.clipboard.writeText(name);
		setShowToaster(true);
		setTimeout(() => setShowToaster(false), 3000);
	};

	return (
		<div className='detailsBanner'>
			{!loading ? (
				<>
					{showToaster && (
						<div className='toaster'>
							<span> {name} copied to clipboard!</span>
						</div>
					)}
					{!!data && (
						<React.Fragment>
							<div className='backdrop-img'>
								<Img src={url?.backdrop + data?.backdrop_path} />
							</div>
							<div className='opacity-layer'></div>
							<ContentWrapper>
								<div className='content'>
									<div className='left'>
										{data.poster_path ? (
											<Img
												src={url?.backdrop + data?.poster_path}
												className='posterImg'
											/>
										) : (
											<Img className='posterImg' src={PosterFallback} />
										)}
									</div>
									<div className='right'>
										<div className='title'>
											{`${name} (${dayjs(
												data?.release_date ||
													data?.first_air_date ||
													data?.last_air_date,
											).format('YYYY')})  `}
											<FaCopy className='button' onClick={handleCopy} />
										</div>
										<div className='subtitle'>{data?.tagline}</div>
										<Genres data={_genres} />

										<div className='row'>
											<CircleRating rating={data?.vote_average.toFixed(1)} />
											<div
												className='playbtn'
												onClick={() => {
													setShow(true);
													setVideoId(video?.key);
												}}
											>
												<PlayIcon />
												<div className='text'>Watch Trailer</div>
											</div>
										</div>

										<div className='overview'>
											<div className='heading'>OverView</div>
											<div className='description'>{data?.overview || ''}</div>
										</div>

										<div className='info'>
											{/* status section */}
											{data?.status && (
												<div className='infoItem'>
													<span className='text bold'>Status: </span>
													<span className='text'>
														{data?.status && 'Ended'
															? 'Complete'
															: data?.status}
													</span>
												</div>
											)}

											{/* Release Date */}
											{data?.release_date ? (
												<div className='infoItem'>
													<span className='text bold'>Release Date: </span>
													<span className='text'>
														{dayjs(data.release_date).format('MMM D, YYYY')}
													</span>
												</div>
											) : data?.first_air_date ? (
												<div className='infoItem'>
													<span className='text bold'>First Air Date: </span>
													<span className='text'>
														{dayjs(data.first_air_date).format('MMM D, YYYY')}
													</span>
												</div>
											) : null}

											{/* Point: Number of Seasons */}
											{data?.number_of_seasons && (
												<div className='infoItem'>
													<span className='text bold'>Session: </span>
													<span className='text'>
														{data?.number_of_seasons}
													</span>
												</div>
											)}

											{/* Point: Number of Episodes */}
											{data?.number_of_episodes && (
												<div className='infoItem'>
													<span className='text bold'>Episodes: </span>
													<span className='text'>
														{data?.number_of_episodes}
													</span>
												</div>
											)}
											{/* Runtime */}
											{data?.runtime && (
												<div className='infoItem'>
													<span className='text bold'>RunTime: </span>
													<span className='text'>
														{toHoursAndMinutes(data?.runtime)}
													</span>
												</div>
											)}
										</div>
										{/* Director */}
										{director?.length > 0 && (
											<div className='info'>
												<span className='text bold'>Director : </span>
												<span className='text'>
													{director?.map((d, i) => (
														<span key={i}>
															{d?.name}
															{director.length - 1 !== i && ', '}
														</span>
													))}
												</span>
											</div>
										)}
										{/* Writer */}
										{writer?.length > 0 && (
											<div className='info'>
												<span className='text bold'>Writer : </span>
												<span className='text'>
													{writer?.map((d, i) => (
														<span key={i}>
															{d?.name}
															{writer.length - 1 !== i && ', '}
														</span>
													))}
												</span>
											</div>
										)}

										{/* Producer */}
										{producer?.length > 0 && (
											<div className='info'>
												<span className='text bold'>Producer: </span>
												<span className='text'>
													{producer?.map((d, i) => (
														<span key={i}>
															{d?.name}
															{producer.length - 1 !== i && ', '}
														</span>
													))}
												</span>
											</div>
										)}
										{/* Creators */}
										{data?.created_by?.length > 0 && (
											<div className='info'>
												<span className='text bold'>Creators: </span>
												<span className='text'>
													{data?.created_by?.map((d, i) => (
														<span key={i}>
															{d?.name}
															{data?.created_by.length - 1 !== i && ', '}
														</span>
													))}
												</span>
											</div>
										)}
									</div>
								</div>
								<VideoPopup
									show={show}
									setShow={setShow}
									videoId={videoId}
									setVideoId={setVideoId}
								/>
							</ContentWrapper>
						</React.Fragment>
					)}
				</>
			) : (
				<div className='detailsBannerSkeleton'>
					<ContentWrapper>
						<div className='left skeleton'></div>
						<div className='right'>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
						</div>
					</ContentWrapper>
				</div>
			)}
		</div>
	);
};

DetailsBanner.propTypes = {
	video: PropTypes.object,
	crew: PropTypes.arrayOf(PropTypes.object),
};

export default DetailsBanner;
