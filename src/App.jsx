import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { fetchDataFromApi } from './utils/api';
import { getApiConfiguration, getGenres } from './store/homeSlice';
getApiConfiguration;

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Detail from './pages/details/Details';
import SearchResult from './pages/searchResult/SearchResult';
import Explore from './pages/explore/Explore';
import PageNotFound from './pages/404/PageNotFound';

function App() {
	const { url } = useSelector((state) => state.home);
	console.log(url);
	const dispatch = useDispatch();

	const fetchApiConfig = () => {
		fetchDataFromApi('/configuration').then((res) => {
			/// url path already have slash (/) at the end so we do not need to add it in here
			const url = {
				backdrop: res.images.secure_base_url + 'original',
				poster: res.images.secure_base_url + 'original',
				profile: res.images.secure_base_url + 'original',
			};

			dispatch(getApiConfiguration(url));
		});
	};

	useEffect(() => {
		fetchApiConfig();
		genresCall();
	}, []);

	// Point : To call Genres API call
	const genresCall = async () => {
		let promises = [];
		let endPoints = ['movie', 'tv'];
		let allGenres = {};

		endPoints.forEach((url) => {
			return promises.push(fetchDataFromApi(`/genre/${url}/list`));
		});

		const data = await Promise.all(promises);
		data.map(({ genres }) => {
			return genres.map((item) => (allGenres[item.id] = item));
		});

		dispatch(getGenres(allGenres));
	};

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:mediaType/:id' element={<Detail />} />
				<Route path='/search/:query' element={<SearchResult />} />
				<Route path='/explore/:mediaType' element={<Explore />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
