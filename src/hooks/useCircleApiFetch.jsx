import { useState, useEffect } from 'react';
import { fetchDataFromCircleEApi } from '../utils/api';

const useNewApiFetch = (endpoint) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const result = await fetchDataFromCircleEApi(endpoint);
				setData(result);
			} catch (err) {
				setError(err.message || 'An error occurred');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [endpoint]);

	return { data, loading, error };
};

export default useNewApiFetch;
