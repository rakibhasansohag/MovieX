import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PropTypes from 'prop-types';

import './circleRating.scss';

const getFirstLetter = (str) => {
	return str.charAt(0).toUpperCase();
};

const CircleRating = ({ rating, fileType = '' }) => {
	const firstLetter = getFirstLetter(fileType);

	return (
		<div className='circleRating'>
			{rating && (
				<CircularProgressbar
					value={rating}
					maxValue={10}
					text={rating}
					styles={buildStyles({
						pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green',
					})}
				/>
			)}
			{fileType && <h1 className='fileType'>{firstLetter}</h1>}
		</div>
	);
};

CircleRating.propTypes = {
	rating: PropTypes.number,
	fileType: PropTypes.string,
};

export default CircleRating;
