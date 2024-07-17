import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import './actorDetails.scss';

import avatar from '../../assets/avatar.png';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper.jsx';
import Carousel from '../../components/carousel/Carousel.jsx';
import useFetch from '../../hooks/useFetch.jsx';
import Img from '../../components/lazyLoadImage/Img.jsx';

const ActorDetails = () => {
	const [actor, setActor] = useState(null);
	const [credits, setCredits] = useState(null);
	const { id } = useParams();
	const { url } = useSelector((state) => state.home);

	const { data, loading } = useFetch(`/person/${id}`);
	const { data: creditsData } = useFetch(`/person/${id}/combined_credits`);

	useEffect(() => {
		setActor(data);
		setCredits(creditsData);
	}, [data, creditsData]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='actorDetails'>
			<ContentWrapper>
				{actor && (
					<>
						<div className='actorProfile'>
							<div className='left'>
								<Img
									className='profileImg'
									src={
										actor.profile_path
											? url.profile + actor.profile_path
											: avatar
									}
								/>
							</div>
							<div className='right'>
								<div className='title'>{actor.name}</div>
								<div className='subtitle'>
									{actor.birthday &&
										`Born ${dayjs(actor.birthday).format('MMM D, YYYY')}`}
									{actor.place_of_birth && ` in ${actor.place_of_birth}`}
								</div>
								<div className='biography'>{actor.biography}</div>
							</div>
						</div>
						<div className='movieCredits'>
							<div className='sectionHeading'>Known For</div>
							<div className='movieList'>
								{/* {credits?.cast?.slice(0, 12).map((movie) => (
									<Carousel key={movie.id} data={movie} fromActor={true} />
								))} */}
							</div>
						</div>
					</>
				)}
			</ContentWrapper>
		</div>
	);
};

export default ActorDetails;
