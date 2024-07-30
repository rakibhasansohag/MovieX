import PropTypes from 'prop-types';

import useCircleApiFetch from '../../hooks/useCircleApiFetch';
import useFetch from '../../hooks/useFetch';

import './circleDownload.scss';
import { useParams } from 'react-router-dom';

const normalizeName = (name) => {
	if (!name) return '';

	return name
		.toLowerCase()
		.replace(/[^a-z0-9]/g, '') // Remove non-alphanumeric characters
		.replace(/\s+/g, ''); // Remove spaces
};

const CircleDownloadPage = () => {
	const { id, mediaType } = useParams();

	const {
		data: tmdbData,
		loading: tmdbLoading,
		error: tmdbError,
	} = useFetch(`/${mediaType}/${id}`);

	console.log(tmdbData);

	const {
		data: circleFtpData,
		loading: circleFtpLoading,
		error: circleFtpError,
	} = useCircleApiFetch(`/posts?searchTerm=${tmdbData?.name}&order=desc`);

	console.log(circleFtpData);

	const findMatchingContent = () => {
		if (!tmdbData || !circleFtpData) return null;

		const tmdbNormalizedName = normalizeName(tmdbData.name);

		const matchedContent = circleFtpData.find((item) => {
			const circleFtpNormalizedName = normalizeName(item.name);
			return (
				tmdbNormalizedName === circleFtpNormalizedName &&
				tmdbData.first_air_date.slice(0, 4) === item.year
			);
		});

		console.log('matched Contetn', matchedContent);

		if (matchedContent) {
			return {
				title: tmdbData.name,
				overview: tmdbData.overview,
				poster: `https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`,
				backdrop: `https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}`,
				year: tmdbData.first_air_date.slice(0, 4),
				genres: tmdbData.genres,
				rating: tmdbData.vote_average,
				episodes: matchedContent.content,
				quality: matchedContent.quality,
				views: matchedContent.view,
			};
		}

		return null;
	};

	if (tmdbLoading || circleFtpLoading) return <div>Loading...</div>;
	if (tmdbError || circleFtpError) return <div>Error occurred</div>;

	const matchedContent = findMatchingContent();
	if (!matchedContent)
		return <div className='no-content'>No matching content found</div>;

	return (
		<div className='download-page'>
			<div>Hello download page</div>
			<div
				className='background-image'
				style={{ backgroundImage: `url(${matchedContent.backdrop})` }}
			></div>
			<div className='content-wrapper'>
				<div className='poster'>
					<img src={matchedContent.poster} alt={matchedContent.title} />
				</div>
				<div className='details'>
					<h1 className='title'>{matchedContent.title}</h1>
					<div className='info'>
						<span className='year'>{matchedContent.year}</span>
						<span className='quality'>{matchedContent.quality}</span>
						<span className='view-count'>{matchedContent.views} views</span>
						<span className='rating'>
							{matchedContent.rating.toFixed(1)} ⭐
						</span>
					</div>
					<div className='genres'>
						{matchedContent.genres.map((genre) => (
							<span key={genre.id} className='genre'>
								{genre.name}
							</span>
						))}
					</div>
					<p className='description'>{matchedContent.overview}</p>
					<div className='seasons'>
						{matchedContent.episodes.map((season, index) => (
							<div key={index} className='season'>
								<h3>{season.seasonName}</h3>
								<div className='episodes'>
									{season.episodes.map((episode, epIndex) => (
										<div key={epIndex} className='episode'>
											<span className='episode-number'>
												Episode {epIndex + 1}
											</span>
											<a
												href={episode.downloadLink}
												className='download-button'
											>
												Download
											</a>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

CircleDownloadPage.propTypes = {
	setGenre: PropTypes.func.isRequired,
	setSortby: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	pageNum: PropTypes.number.isRequired,
	fetchInitialData: PropTypes.func.isRequired,
};

export default CircleDownloadPage;
