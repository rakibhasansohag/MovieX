import { useEffect, useState } from 'react';
import { fetchDataFromApi } from '../utils/api';

// const useFetch = (url) => {
// 	const [data, setData] = useState(null);
// 	const [loading, setLoading] = useState(false);
// 	const [error, setError] = useState(null);

// 	useEffect(() => {
// 		setLoading(true);
// 		setData(null);
// 		setError(null);

// 		fetchDataFromApi(url)
// 			.then((res) => {
// 				setLoading(false);
// 				setData(res);
// 			})
// 			.catch((err) => {
// 				setLoading(false);
// 				setError('Something went wrong !');
// 				setError(err);
// 			});
// 	}, [url]);

// 	return { data, loading, error };
// };

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setData(null);
		setError(null);

		fetchDataFromApi(url)
			.then((res) => {
				if (res.success === false) {
					throw new Error(res.status_message);
				}
				setLoading(false);
				setData(res);
			})
			.catch((err) => {
				setLoading(false);
				setError(err.message || 'Something went wrong!');
			});
	}, [url]);

	return { data, loading, error };
};

export default useFetch;
