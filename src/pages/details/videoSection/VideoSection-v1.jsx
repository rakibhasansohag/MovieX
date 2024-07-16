import { useState } from 'react';
import PropTypes from 'prop-types';

import './videoSection.scss';

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { PlayIcon } from '../PlayIcon';
import VideoPopup from '../../../components/videoPopup/VideoPopup';
import Img from '../../../components/lazyLoadImage/Img';

const VideosSection = ({ data, loading, video: orVideo }) => {
	const [show, setShow] = useState(false);
	const [videoId, setVideoId] = useState(null);

	const loadingSkeleton = () => {
		return (
			<div className='skItem'>
				<div className='thumb skeleton'></div>
				<div className='row skeleton'></div>
				<div className='row2 skeleton'></div>
			</div>
		);
	};

	return (
		<div className='videosSection'>
			<ContentWrapper>
				<div className='sectionHeading'>Official Videos</div>
				{!loading ? (
					<div className='videos'>
						{data?.results?.map((video) => (
							<div
								onClick={() => {
									setVideoId(video.key);
									setShow(true);
								}}
								key={video.id}
								className='videoItem'
							>
								<div className='videoThumbnail'>
									<Img
										src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
									/>
									<PlayIcon />
								</div>
								<p className='videoTitle'>{video?.name}</p>
							</div>
						))}
					</div>
				) : (
					<div className='videoSkeleton'>
						{loadingSkeleton()}
						{loadingSkeleton()}
						{loadingSkeleton()}
						{loadingSkeleton()}
					</div>
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

	video: PropTypes.object,
};

export default VideosSection;
