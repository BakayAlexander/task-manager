import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../../store/reducer';
import './Login.css';

function Login({ onSubmit, ...props }) {
	const dispatch = useDispatch();
	const [login, setLogin] = React.useState('');
	const [password, setPassword] = React.useState('');

	function handleChangeLogin(e) {
		setLogin(e.target.value);
	}

	function handleChangePassword(e) {
		setPassword(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(loginAction(login, password));
	}
	return (
		<section className='login'>
			<h2 className='login__title'>Welcome! Please sign in.</h2>
			<form className='login-form' onSubmit={handleSubmit}>
				<label className='login-form__label'>
					Login
					<input
						className='login-form__input'
						id='login-input'
						type='text'
						autoComplete='none'
						placeholder='Plese enter your login'
						value={login ?? ''}
						onChange={handleChangeLogin}
					></input>
				</label>

				<label className='login-form__label'>
					Password
					<input
						className='login-form__input'
						id='password-input'
						type='password'
						autoComplete='none'
						placeholder='Please enter your password'
						value={password ?? ''}
						onChange={handleChangePassword}
					></input>
				</label>
				<button className='login-form__submit-button' type='submit'>
					Login
				</button>
				<div className='login-form__link-container'>
					<span className='login-form__signup-span'>
						This form is available only for users with admin rights.
						<Link to='/' className='login-form__signup-link'>
							To main page.
						</Link>
					</span>
				</div>
			</form>
		</section>
	);
}

export default Login;
