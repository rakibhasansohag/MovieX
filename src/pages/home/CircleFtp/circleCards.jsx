import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import useCircleApiFetch from '../../../hooks/useCircleApiFetch';
import CircleCarousel from '../../../components/carousel/CircleCarousel';

const CircleCards = () => {
	const { data, loading } = useCircleApiFetch(`/home-page/getHomePagePosts`);

	// console.log('circle cards', data);

	// let mapData = data[0]?.latestPost;
	// console.log(mapData);

	return (
		<div className='carouselSection'>
			<ContentWrapper>
				<span className='carouselTitle'>Circle Content</span>
			</ContentWrapper>

			{/* <CircleCarousel data={data?.results} loading={loading} />
			 */}

			{data && (
				<>
					<CircleCarousel
						data={data[0]?.latestPost}
						loading={loading}
						endpoint='latestPost'
						title='Latest Posts'
					/>

					<CircleCarousel
						data={data[0]?.mostVisitedPosts}
						loading={loading}
						endpoint='mostVisitedPosts'
						title='Most Visited Posts'
					/>
				</>
			)}
		</div>
	);
};

export default CircleCards;
