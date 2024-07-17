import { useRef } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from 'react-icons/bs';

import './cast.scss';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoadImage/Img';
import avatar from '../../../assets/avatar.png';
import { useNavigate } from 'react-router-dom';

const Cast = ({ cast, loading }) => {
	const { url } = useSelector((state) => state.home);
	const carouselContainer = useRef();
	const navigate = useNavigate();

	const navigation = (dir) => {
		const container = carouselContainer.current;

		const scrollAmount =
			dir === 'left'
				? container.scrollLeft - (container.offsetWidth + 20)
				: container.scrollLeft + (container.offsetWidth + 20);

		container.scrollTo({
			left: scrollAmount,
			behavior: 'smooth',
		});
	};

	if (cast.length === 0) return null;

	console.log(cast);

	const goToActorPage = (id) => {
		navigate(`/person/${id}`);
	};

	const skeleton = () => {
		return (
			<div className='skItem'>
				<div className='circle skeleton'></div>
				<div className='row skeleton'></div>
				<div className='row2 skeleton'></div>
			</div>
		);
	};

	return (
		<div className='castSection'>
			<ContentWrapper>
				<div className='sectionHeading'>Top Cast</div>
				{!loading ? (
					<div className='listItems' ref={carouselContainer}>
						{cast?.map((item) => {
							let imgUrl = item?.profile_path
								? url?.profile + item?.profile_path
								: avatar;
							return (
								<div
									className='listItem'
									key={item?.id}
									onClick={() => goToActorPage(item.id)}
								>
									<div className='profileImg'>
										<Img
											src={imgUrl}
											alt={item?.original_name || item?.character}
										/>
									</div>
									<p className='name'>{item?.name}</p>
									<p className='character'>{item?.character}</p>
								</div>
							);
						})}
					</div>
				) : (
					<div className='castSkeleton'>
						{skeleton()}
						{skeleton()}
						{skeleton()}
						{skeleton()}
						{skeleton()}
						{skeleton()}
					</div>
				)}
				{cast?.length > 6 && (
					<>
						<BsFillArrowLeftCircleFill
							className='carouselLeftNav arrow'
							onClick={() => navigation('left')}
						/>
						<BsFillArrowRightCircleFill
							className='carouselRightNav arrow'
							onClick={() => navigation('right')}
						/>
					</>
				)}
			</ContentWrapper>
		</div>
	);
};

Cast.propTypes = {
	cast: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			profile_path: PropTypes.string,
			name: PropTypes.string,
			character: PropTypes.string,
			original_name: PropTypes.string,
		}),
	),
	loading: PropTypes.bool.isRequired,
};

export default Cast;
