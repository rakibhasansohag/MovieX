import { useRef, useState } from 'react';
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import './carousel.scss';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';
import PosterFallback from '../../assets/no-poster.png';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';

const Carousel = ({ data, loading, endPoint, title }) => {
	const carouselContainer = useRef();
	const { url } = useSelector((state) => state.home);
	const navigate = useNavigate();
	const [isNavigating, setIsNavigating] = useState(false);

	const navigation = (dir) => {
		if (loading || isNavigating) return;
		setIsNavigating(true);

		const container = carouselContainer.current;

		const scrollAmount =
			dir === 'left'
				? container.scrollLeft - (container.offsetWidth + 20)
				: container.scrollLeft + (container.offsetWidth + 20);

		const distance = Math.abs(container.scrollLeft - scrollAmount);
		const duration = Math.min(distance * 0.5, 1000);

		container.scrollTo({
			left: scrollAmount,
			behavior: 'smooth',
			duration: duration,
		});

		setTimeout(() => {
			setIsNavigating(false);
		}, duration);
	};

	const skItem = () => {
		return (
			<div className='skeletonItem'>
				<div className='posterBlock skeleton'></div>
				<div className='textBlock'>
					<div className='title skeleton'></div>
					<div className='date  skeleton'></div>
				</div>
			</div>
		);
	};

	return (
		<div className='carousel'>
			<ContentWrapper>
				{title && <div className='carouselTitle'> {title} </div>}
				<BsFillArrowLeftCircleFill
					className='carouselLeftNav arrow'
					onClick={() => navigation('left')}
				/>
				<BsFillArrowRightCircleFill
					className='carouselRightNav arrow'
					onClick={() => navigation('right')}
				/>
				{!loading ? (
					<div className='carouselItems' ref={carouselContainer}>
						{data?.map((item) => {
							// const posterUrl = item.poster_path
							//   ? url.poster + item.poster_path
							//   : PosterFallback;

							const posterUrl =
								item?.poster_path && url?.poster
									? url?.poster + item?.poster_path
									: PosterFallback;

							return (
								<div
									key={item.id}
									className='carouselItem'
									onClick={() =>
										navigate(`/${item?.media_type || endPoint}/${item?.id}`)
									}
								>
									<div className='posterBlock'>
										<Img src={posterUrl} />
										<CircleRating rating={item.vote_average.toFixed(1)} />
										<Genres data={item?.genre_ids.slice(0, 2)} />
									</div>
									<div className='textBlock'>
										<span className='title'>
											{item.title || item.name || item.original_name}
										</span>
										<span className='date'>
											{dayjs(item.first_air_date || item?.release_Date).format(
												'MMM DD, YYYY',
											)}
										</span>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className='loadingSkeleton'>
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
						{skItem()}
					</div>
				)}
			</ContentWrapper>
		</div>
	);
};
Carousel.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			poster_path: PropTypes.string,
			vote_average: PropTypes.number.isRequired,
			genre_ids: PropTypes.arrayOf(PropTypes.number),
			title: PropTypes.string,
			name: PropTypes.string,
			original_name: PropTypes.string,
			first_air_date: PropTypes.string,
			release_date: PropTypes.string,
			media_type: PropTypes.string,
		}),
	),
	loading: PropTypes.bool.isRequired,
	endPoint: PropTypes.string.isRequired,
	title: PropTypes.string,
};
export default Carousel;
