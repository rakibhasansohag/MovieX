import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './style.scss';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videoSection/VideoSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';
import DownloadComponent from '../../components/download';
function Details() {
	const { id, mediaType } = useParams();
	const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
	const { data: credits, loading: creditsLoading } = useFetch(
		`/${mediaType}/${id}/credits`,
	);
	return (
		<div>
			<DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
			<Cast cast={credits?.cast} loading={creditsLoading} />
			<VideosSection data={credits} loading={loading} />
			<DownloadComponent data={credits} loading={loading} />
			<Similar mediaType={mediaType} id={id} />
			<Recommendation mediaType={mediaType} id={id} />
		</div>
	);
}

export default Details;
