import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./style.scss";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideoSection";
function Details() {
  const { id, mediaType } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: creditsLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  console.log("details", credits?.crew);
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast cast={credits?.cast} loading={creditsLoading} />
      <VideosSection data={data} loading={loading} />
    </div>
  );
}

export default Details;
