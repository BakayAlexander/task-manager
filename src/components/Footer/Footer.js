import React from 'react';
import './Footer.css';

function Footer() {
	const date = new Date();
	return (
		<footer className='footer'>
			<div className='footer__container'>
				<h3 className='footer__title'>Simple task manager project</h3>
				<div className='footer__links-container'>
					<p className='footer__year'> &#169; {date.getFullYear()}</p>
					<ul className='footer__links'>
						<li className='footer__link'>
							<a
								className='footer__link-item'
								href='https://career.habr.com/alexander_bakay'
								target='_blank'
								rel='noreferrer'
							>
								HabrCareer
							</a>
						</li>
						<li className='footer__link'>
							<a
								className='footer__link-item'
								href='https://github.com/BakayAlexander'
								target='_blank'
								rel='noreferrer'
							>
								GitHub
							</a>
						</li>
						<li className='footer__link'>
							<a
								className='footer__link-item'
								href='https://www.linkedin.com/in/alexander-bakay-b6b041224/'
								target='_blank'
								rel='noreferrer'
							>
								LinkedIn
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
