import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.css';

function Header() {
	return (
		<header className='header'>
			<div className='header__logo-container'>
				<Logo />
				<Link to='/' className='header__title-link'>
					<h1 className='header__title'>Task manager</h1>
				</Link>
			</div>
			<Link className='header__login-link' to='/login'>
				Sign in
			</Link>
		</header>
	);
}

export default Header;
