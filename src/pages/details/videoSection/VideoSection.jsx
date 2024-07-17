import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from 'react-icons/bs';

import './videoSection.scss';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { PlayIcon } from '../PlayIcon';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import Img from '../../../components/lazyLoadImage/Img';

const VideosSection = ({ data, loading, video }) => {
	const [show, setShow] = useState(false);
	const [videoId, setVideoId] = useState(null);
	const carouselContainer = useRef();

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

	const loadingSkeleton = () => {
		return (
			<div className='skItem'>
				<div className='thumb skeleton'></div>
				<div className='row skeleton'></div>
				<div className='row2 skeleton'></div>
			</div>
		);
	};

	const handleVideoClick = (videoKey) => {
		setVideoId(videoKey);
		setShow(true);
	};

	return (
		<div className='videosSection'>
			<ContentWrapper>
				<div className='sectionHeading'>Official Videos</div>
				{!loading ? (
					<div className='videos' ref={carouselContainer}>
						{data?.results?.map((item) => (
							<div
								key={item.id}
								className='videoItem'
								onClick={() => handleVideoClick(item.key)}
							>
								<div className='videoThumbnail'>
									<Img
										src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
									/>
									<PlayIcon />
								</div>
								<div className='videoTitle'>{item.name}</div>
							</div>
						))}
						{!data?.results?.length && video && (
							<div
								className='videoItem'
								onClick={() => handleVideoClick(video.key)}
							>
								<div className='videoThumbnail'>
									<Img
										src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
									/>
									<PlayIcon />
								</div>
								<div className='videoTitle'>{video.name}</div>
							</div>
						)}
					</div>
				) : (
					<div className='videoSkeleton'>
						{loadingSkeleton()}
						{loadingSkeleton()}
						{loadingSkeleton()}
						{loadingSkeleton()}
					</div>
				)}
				{data?.results?.length > 4 && (
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
			<VideoPopup
				show={show}
				setShow={setShow}
				videoId={videoId}
				setVideoId={setVideoId}
			/>
		</div>
	);
};

VideosSection.propTypes = {
	data: PropTypes.shape({
		results: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				key: PropTypes.string.isRequired,
				name: PropTypes.string,
			}),
		),
	}),
	loading: PropTypes.bool.isRequired,
	video: PropTypes.shape({
		key: PropTypes.string.isRequired,
		name: PropTypes.string,
	}),
};

export default VideosSection;
