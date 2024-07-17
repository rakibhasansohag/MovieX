import { useState, useEffect, useRef } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { SlMenu } from 'react-icons/sl';
import { VscChromeClose } from 'react-icons/vsc';
import { useNavigate, useLocation } from 'react-router-dom';

import './style.scss';

import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from '../../assets/moviex-logo.svg';

const Header = () => {
	const [show, setShow] = useState('top');
	const [lastScrollY, setLastScrollY] = useState(0);
	const [mobileMenu, setMobileMenu] = useState(false);
	const [query, setQuery] = useState('');
	const [showSearch, setShowSearch] = useState(false);
	const searchRef = useRef(null);
	const inputRef = useRef(null);

	const navigate = useNavigate();
	const location = useLocation();

	const openSearch = () => {
		if (!showSearch) {
			setMobileMenu(false);
			setShowSearch(true);
			setTimeout(() => {
				inputRef.current?.focus();
			}, 0);
		}
	};

	const openMobileMenu = () => {
		setMobileMenu(true);
		setShowSearch(false);
	};

	const searchQueryHandler = (event) => {
		if (event.key === 'Enter' && query.length > 0) {
			navigate(`/search/${query}`);
			setTimeout(() => {
				setShowSearch(false);
			}, 1000);
		}
	};

	const navigationHandler = (type) => {
		if (type === 'movie') {
			navigate(`/explore/movie`);
		} else {
			navigate(`/explore/tv`);
		}
		setMobileMenu(false);
	};

	const controlNavbar = () => {
		if (window.scrollY > 200) {
			if (window.scrollY > lastScrollY && !mobileMenu) {
				setShow('hide');
			} else {
				setShow('show');
			}
		} else {
			setShow('top');
		}
		setLastScrollY(window.scrollY);
	};

	useEffect(() => {
		window.addEventListener('scroll', controlNavbar);
		return () => {
			window.removeEventListener('scroll', controlNavbar);
		};
	}, [lastScrollY]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setShowSearch(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<header className={`header ${mobileMenu ? 'mobileView' : ''} ${show}`}>
			<ContentWrapper>
				<div className='logo' onClick={() => navigate('/')}>
					<img src={logo} alt='' />
				</div>
				<ul className='menuItems'>
					<li className='menuItem' onClick={() => navigationHandler('movie')}>
						Movies
					</li>
					<li className='menuItem' onClick={() => navigationHandler('tv')}>
						TV Shows
					</li>
					<li className='menuItem'>
						<HiOutlineSearch
							onClick={openSearch}
							className={showSearch ? 'disabled' : ''}
						/>
					</li>
				</ul>
				<div className='mobileMenuItems'>
					<HiOutlineSearch
						onClick={openSearch}
						className={showSearch ? 'disabled' : ''}
					/>
					{mobileMenu ? (
						<VscChromeClose onClick={() => setMobileMenu(false)} />
					) : (
						<SlMenu onClick={openMobileMenu} />
					)}
				</div>
			</ContentWrapper>
			{showSearch && (
				<div className='searchBar' ref={searchRef}>
					<ContentWrapper>
						<div className='searchInput'>
							<input
								ref={inputRef}
								type='text'
								placeholder='Search for a movie or tv show....'
								onChange={(e) => setQuery(e.target.value)}
								onKeyUp={searchQueryHandler}
							/>
							<VscChromeClose onClick={() => setShowSearch(false)} />
						</div>
					</ContentWrapper>
				</div>
			)}
		</header>
	);
};

export default Header;
