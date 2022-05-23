import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

function NotFound() {
	return (
		<section className='not-found'>
			<h1 className='not-found__status'>404</h1>
			<p className='not-found__message'>Page doesn't exist</p>
			<Link to='/' className='not-found__link'>
				To main page
			</Link>
		</section>
	);
}

export default NotFound;
