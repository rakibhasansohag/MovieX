import './style.scss';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const DownloadComponent = () => {
	const { id, mediaType } = useParams();
	const { data, loading } = useFetch(`/${mediaType}/${id}`);

	const name = data?.name || data?.title || data?.original_name;
	const _genres = data?.genres?.map((g) => g.name.toLowerCase());

	const RedirectToKayoAnime = () => {
		const searchQuery = encodeURIComponent(name);
		window.open(
			`https://www.google.com/search?q=${searchQuery}+kayoanime`,
			'_blank',
		);
	};

	const redirectToIMDb = () => {
		window.open('https://www.imdb.com', '_blank');
	};

	return (
		<div className='download-component'>
			<div></div>
			{_genres && _genres.includes('animation') && (
				<div>
					<button
						onClick={RedirectToKayoAnime}
						disabled={loading}
						className='link-button'
					>
						Kayo Anime
					</button>
				</div>
			)}
			<div onClick={redirectToIMDb}>
				<button disabled={loading} className='link-button'>
					IMDb
				</button>
			</div>
		</div>
	);
};

export default DownloadComponent;
