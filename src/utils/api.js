import axios from 'axios';

const BASE_URL = ' https://api.themoviedb.org/3';
const CIRCLE_API = 'http://15.1.1.50:5000/api';
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
	Authorization: `Bearer ${TMDB_TOKEN}`,
};

export const fetchDataFromApi = async (url, params) => {
	try {
		const { data } = await axios.get(BASE_URL + url, { headers, params });
		return data;
	} catch (err) {
		console.log('Error while calling api', err);
	}
};

export const fetchDataFromCircleEApi = async (endpoint) => {
	try {
		const { data } = await axios.get(`${CIRCLE_API}${endpoint}`);
		return data;
	} catch (err) {
		console.error('Error while calling new api', err);
		throw err;
	}
};
