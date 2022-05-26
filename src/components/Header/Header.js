import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCookie, logoutAction } from '../../store/actions';
import Logo from '../Logo/Logo';
import './Header.css';

function Header() {
	const dispatch = useDispatch();
	return (
		<header className='header'>
			<div className='header__logo-container'>
				<Logo />
				<Link to='/' className='header__title-link'>
					<h1 className='header__title'>Task manager</h1>
				</Link>
			</div>
			<div>
				{getCookie('token') ? (
					<button
						className='header__logout-button'
						onClick={() => {
							dispatch(logoutAction());
						}}
					>
						Logout
					</button>
				) : (
					<Link className='header__login-link' to='/login'>
						Sign in
					</Link>
				)}
			</div>
		</header>
	);
}

export default Header;
