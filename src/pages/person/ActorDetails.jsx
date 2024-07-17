import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { FaCopy } from 'react-icons/fa';

import './actorDetails.scss';

import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import useFetch from '../../hooks/useFetch';
import Img from '../../components/lazyLoadImage/Img.jsx';
import PosterFallback from '../../assets/no-poster.png';
import Carousel from '../../components/carousel/Carousel';
import { BsGlobeCentralSouthAsia } from 'react-icons/bs';

const ActorDetails = () => {
	const [actor, setActor] = useState(null);
	const [showToaster, setShowToaster] = useState(false);

	const { id } = useParams();
	const { url } = useSelector((state) => state.home);

	const { data, loading } = useFetch(`/person/${id}`);
	const { data: movieCredits, loading: movieLoading } = useFetch(
		`/person/${id}/movie_credits`,
	);

	useEffect(() => {
		setActor(data);
	}, [data]);

	const handleCopy = () => {
		navigator.clipboard.writeText(actor?.name);
		setShowToaster(true);
		setTimeout(() => setShowToaster(false), 3000);
	};

	const sortedMovieCredits =
		movieCredits?.cast?.sort((a, b) => b.popularity - a.popularity) || [];
	console.log({
		sortedMovieCredits,
		actor,
	});

	return (
		<div className='actorDetails'>
			{!loading ? (
				<>
					{showToaster && (
						<div className='toaster'>
							<span>{actor?.name} copied to clipboard!</span>
						</div>
					)}
					{actor && (
						<React.Fragment>
							<div className='backdrop-img'>
								<Img src={url?.profile + actor?.profile_path} />
							</div>
							<div className='opacity-layer'></div>
							<ContentWrapper>
								<div className='content'>
									<div className='left'>
										{actor.profile_path ? (
											<Img
												className='posterImg'
												src={url?.profile + actor?.profile_path}
											/>
										) : (
											<Img className='posterImg' src={PosterFallback} />
										)}
									</div>
									<div className='right'>
										<div className='title'>
											{actor.name}
											<FaCopy className='button' onClick={handleCopy} />
										</div>
										<div className='subtitle'>
											{actor.birthday &&
												`Born ${dayjs(actor.birthday).format('MMM D, YYYY')}`}
											{actor.place_of_birth && ` in ${actor.place_of_birth}`}
										</div>

										<div className='overview'>
											<div className='heading'>Biography</div>
											<div className='description'>
												{actor.biography || 'No biography available.'}
											</div>
										</div>

										<div className='info'>
											{actor?.known_for_department && (
												<div className='infoItem'>
													<span className='text bold'>Known For: </span>
													<span className='text'>
														{actor.known_for_department}
													</span>
												</div>
											)}
											{actor?.popularity && (
												<div className='infoItem'>
													<span className='text bold'>Popularity: </span>
													<span className='text'>
														{actor.popularity.toFixed(2)}
													</span>
												</div>
											)}
											{actor?.homepage && (
												<div className='infoItem'>
													<Link to={actor?.homepage} className='text bold link'>
														<BsGlobeCentralSouthAsia className='icon' /> Website
													</Link>
												</div>
											)}
										</div>
									</div>
								</div>
							</ContentWrapper>
						</React.Fragment>
					)}
					<div className='carouselSection'>
						<ContentWrapper>
							<h3 className='HoverTitle'>Known For</h3>
						</ContentWrapper>
						<Carousel
							data={sortedMovieCredits}
							loading={movieLoading}
							endpoint={'movie' || 'tv'}
						/>
					</div>
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

export default ActorDetails;
