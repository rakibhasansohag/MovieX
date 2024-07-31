import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import './carousel.scss';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import Img from '../lazyLoadImage/Img';
import PosterFallback from '../../assets/no-poster.png';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';

const CircleCarousel = ({ data, loading, endpoint, title }) => {
	const carouselContainer = useRef();
	const navigate = useNavigate();
	const [isNavigating, setIsNavigating] = useState(false);

	const imageBaseUrl = '	http://15.1.1.50:5000/uploads';

	const navigation = (dir) => {
		if (loading || isNavigating) return;
		setIsNavigating(true);

		const container = carouselContainer.current;
		const scrollAmount =
			dir === 'left'
				? container.scrollLeft - (container.offsetWidth + 20)
				: container.scrollLeft + (container.offsetWidth + 20);

		container.scrollTo({
			left: scrollAmount,
			behavior: 'smooth',
		});

		setTimeout(() => {
			setIsNavigating(false);
		}, 500);
	};

	console.log({
		carouselContainer: data,
	});

	const skItem = () => (
		<div className='skeletonItem'>
			<div className='posterBlock skeleton'></div>
			<div className='textBlock'>
				<div className='title skeleton'></div>
				<div className='date skeleton'></div>
			</div>
		</div>
	);

	return (
		<div className='carousel'>
			<ContentWrapper>
				{title && <div className='carouselTitle'>{title}</div>}
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
							const posterUrl = item?.image ? item?.image : PosterFallback;

							return (
								<div
									key={item?.id}
									className='carouselItem'
									onClick={() =>
										navigate(`/circle-download/${item?.id}/${endpoint}`)
									}
								>
									<div className='posterBlock'>
										<Img src={`${imageBaseUrl}/${posterUrl}`} />
										<CircleRating fileType={item?.type} />
										<Genres data={[item.type]} />
									</div>
									<div className='textBlock'>
										<span className='title'>{item?.title}</span>
										<span className='date'>
											{dayjs(item.year).format('YYYY')}
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

CircleCarousel.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			image: PropTypes.string,
			quality: PropTypes.string,
			title: PropTypes.string.isRequired,
			type: PropTypes.string,
			year: PropTypes.string,
		}),
	),
	loading: PropTypes.bool.isRequired,
	endpoint: PropTypes.string.isRequired,
	title: PropTypes.string,
};

export default CircleCarousel;
