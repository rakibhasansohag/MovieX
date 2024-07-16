import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './style.scss';

const PageNotFound = () => {
	const router = useNavigate();
	const [digits, setDigits] = useState(['4', '0', '4']);

	useEffect(() => {
		const startTime = Date.now();
		const duration = 2000; // 2 seconds
		const finalDigits = ['4', '0', '4'];

		const intervalId = setInterval(() => {
			const elapsedTime = Date.now() - startTime;

			if (elapsedTime >= duration) {
				clearInterval(intervalId);
				setDigits(finalDigits);
			} else {
				setDigits(
					finalDigits.map(() => Math.floor(Math.random() * 10).toString()),
				);
			}
		}, 30);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<div className='pageNotFound'>
			<div className='container-floud'>
				<div className='col-xs-12 ground-color text-center'>
					<div className='errorPage'>
						{digits.map((digit, index) => (
							<div key={index} className='clip'>
								<div className='shadow'>
									<span
										className={`digit number${['One', 'Two', 'Three'][index]}`}
									>
										{digit}
									</span>
								</div>
							</div>
						))}
					</div>
					<h2>
						Oops! Page not found
						<br />
						That&apos;s an error
					</h2>
					<div>
						<div className='button-parent'>
							<button className='backButton' onClick={() => router(-1)}>
								Go back{' '}
								<div className='icon'>
									<FaArrowLeft />
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
