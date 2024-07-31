import './style.scss';
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';
import CircleCards from './CircleFtp/circleCards';

function Home() {
	return (
		<div className='homePage'>
			<HeroBanner />
			<Trending />
			<Popular />
			<TopRated />
			<CircleCards />
		</div>
	);
}

export default Home;
