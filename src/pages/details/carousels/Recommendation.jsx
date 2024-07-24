import PropTypes from 'prop-types';

import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';

const Recommendation = ({ mediaType, id }) => {
	const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

	const { data: detailsData, loading: detailsLoading } = useFetch(
		`/${mediaType}/${id}`,
	);

	const { data: recommendationMovie, loading: recommendationLoading } =
		useFetch(
			`/${mediaType}/airing_today?language=${
				detailsData?.languages[0] || 'en-US'
			}`,
		);

	const allLoading = loading || recommendationLoading | detailsLoading;

	console.log(detailsData);

	return (
		<>
			{data?.results?.length > 0 ? (
				<Carousel
					title='Recommendations'
					data={data.results}
					loading={allLoading}
					endpoint={mediaType}
				/>
			) : (
				<div className='no-recommendations'>
					{allLoading ? (
						<p>Loading...</p> // TODO : will added skeliten after
					) : recommendationMovie?.results?.length > 0 ? (
						<Carousel
							title='Airing Today'
							data={recommendationMovie.results}
							loading={allLoading}
							endpoint={'movie'}
						/>
					) : (
						<p>No recommendations or top rated movies available.</p>
					)}
				</div>
			)}
		</>
	);
};

Recommendation.propTypes = {
	mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Recommendation;
