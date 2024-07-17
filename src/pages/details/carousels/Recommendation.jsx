import PropTypes from 'prop-types';

import Carousel from '../../../components/carousel/Carousel';
import useFetch from '../../../hooks/useFetch';

const Recommendation = ({ mediaType, id }) => {
	const { data, loading } = useFetch(`/${mediaType}/${id}/recommendations`);

	return (
		<Carousel
			title='Recommendations'
			data={data?.results}
			loading={loading}
			endpoint={mediaType}
		/>
	);
};

Recommendation.propTypes = {
	mediaType: PropTypes.oneOf(['movie', 'tv']).isRequired,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Recommendation;
