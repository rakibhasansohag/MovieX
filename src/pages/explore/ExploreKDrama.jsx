import PropTypes from 'prop-types';

import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Select from 'react-select';

import './style.scss';

import useFetch from '../../hooks/useFetch';
import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import Spinner from '../../components/spinner/Spinner';

let filters = {};

const sortbyData = [
	{ value: 'popularity.desc', label: 'Popularity Descending' },
	{ value: 'popularity.asc', label: 'Popularity Ascending' },
	{ value: 'vote_average.desc', label: 'Rating Descending' },
	{ value: 'vote_average.asc', label: 'Rating Ascending' },
	{
		value: 'primary_release_date.desc',
		label: 'Release Date Descending',
	},
	{ value: 'primary_release_date.asc', label: 'Release Date Ascending' },
	{ value: 'original_title.asc', label: 'Title (A-Z)' },
];

const ExploreKDrama = () => {
	const [data, setData] = useState(null);
	const [pageNum, setPageNum] = useState(1);
	const [loading, setLoading] = useState(false);
	const [genre, setGenre] = useState(null);
	const [sortby, setSortby] = useState(null);

	const { data: genresData } = useFetch(`/genre/tv/list`);

	const fetchInitialData = () => {
		setLoading(true);
		fetchDataFromApi(`/discover/tv?with_original_language=ko`, filters).then(
			(res) => {
				setData(res);
				setPageNum((prev) => prev + 1);
				setLoading(false);
			},
		);
	};

	const fetchNextPageData = () => {
		fetchDataFromApi(
			`/discover/tv?with_original_language=ko&page=${pageNum}`,
			filters,
		).then((res) => {
			if (data?.results) {
				setData({
					...data,
					results: [...data.results, ...res.results],
				});
			} else {
				setData(res);
			}
			setPageNum((prev) => prev + 1);
		});
	};

	useEffect(() => {
		filters = {};
		setData(null);
		setPageNum(1);
		setSortby(null);
		setGenre(null);
		fetchInitialData();
	}, []);

	const onChange = (selectedItems, action) => {
		if (action.name === 'sortby') {
			setSortby(selectedItems);
			if (action.action !== 'clear') {
				filters.sort_by = selectedItems.value;
			} else {
				delete filters.sort_by;
			}
		}

		if (action.name === 'genres') {
			setGenre(selectedItems);
			if (action.action !== 'clear') {
				let genreId = selectedItems.map((g) => g.id);
				genreId = JSON.stringify(genreId).slice(1, -1);
				filters.with_genres = genreId;
			} else {
				delete filters.with_genres;
			}
		}

		setPageNum(1);
		fetchInitialData();
	};

	return (
		<div className='explorePage'>
			<ContentWrapper>
				<div className='pageHeader'>
					<div className='pageTitle'>Explore K-Dramas</div>
					<div className='filters'>
						<Select
							isMulti
							name='genres'
							value={genre}
							closeMenuOnSelect={false}
							options={genresData?.genres}
							getOptionLabel={(option) => option.name}
							getOptionValue={(option) => option.id}
							onChange={onChange}
							placeholder='Select genres'
							className='react-select-container genresDD'
							classNamePrefix='react-select'
						/>
						<Select
							name='sortby'
							value={sortby}
							options={sortbyData}
							onChange={onChange}
							isClearable={true}
							placeholder='Sort by'
							className='react-select-container sortbyDD'
							classNamePrefix='react-select'
						/>
					</div>
				</div>
				{loading && <Spinner initial={true} />}
				{!loading && (
					<>
						{data?.results?.length > 0 ? (
							<InfiniteScroll
								className='content'
								dataLength={data?.results?.length || []}
								next={fetchNextPageData}
								hasMore={pageNum <= data?.total_pages}
								loader={<Spinner />}
							>
								{data?.results?.map((item, index) => {
									if (item.media_type === 'person') return;
									return <MovieCard key={index} data={item} mediaType={'tv'} />;
								})}
							</InfiniteScroll>
						) : (
							<span className='resultNotFound'>Sorry, Results not found!</span>
						)}
					</>
				)}
			</ContentWrapper>
		</div>
	);
};

ExploreKDrama.propTypes = {
	data: PropTypes.shape({
		results: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				media_type: PropTypes.string,
				poster_path: PropTypes.string,
				title: PropTypes.string,
				name: PropTypes.string,
				release_date: PropTypes.string,
				first_air_date: PropTypes.string,
				vote_average: PropTypes.number,
				overview: PropTypes.string,
			}),
		),
		total_pages: PropTypes.number,
	}),
	loading: PropTypes.bool.isRequired,
	fetchNextPageData: PropTypes.func.isRequired,
	genresData: PropTypes.shape({
		genres: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				name: PropTypes.string.isRequired,
			}),
		),
	}),
	genre: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		}),
	),
	sortby: PropTypes.shape({
		value: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}),
	setGenre: PropTypes.func.isRequired,
	setSortby: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	pageNum: PropTypes.number.isRequired,
	fetchInitialData: PropTypes.func.isRequired,
};

export default ExploreKDrama;
