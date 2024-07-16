import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import './genres.scss';
import Spinner from '../spinner/Spinner';

const Genres = ({ data }) => {
	const { genres } = useSelector((state) => state.home);

	if (!genres) return <Spinner />;

	return (
		<div className='genres'>
			{data?.map((genreId) => {
				const genre = genres[genreId];
				if (!genre || !genre?.name) return null;
				return (
					<div key={genreId} className='genre'>
						{genre?.name}
					</div>
				);
			})}
		</div>
	);
};

Genres.propTypes = {
	data: PropTypes.arrayOf(PropTypes.number),
};

export default Genres;
