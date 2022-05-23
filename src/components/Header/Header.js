import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Header.css';

function Header() {
	return (
		<header className='header'>
			<h1 className='header__title'>Task manager</h1>
			<Logo />
			<Link className='header__login-link' to='/signin'>
				Sign in
			</Link>
		</header>
	);
}

export default Header;
