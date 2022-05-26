import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, loginAction } from '../../store/actions';
import { errorLoginSelector } from '../../store/selectors';
import './Login.css';

function Login({ onSubmit, ...props }) {
	const dispatch = useDispatch();
	const [login, setLogin] = React.useState('');
	const [password, setPassword] = React.useState('');
	const history = useNavigate();
	const error = useSelector(errorLoginSelector);

	function handleChangeLogin(e) {
		setLogin(e.target.value);
	}

	function handleChangePassword(e) {
		setPassword(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(loginAction(login, password)).then(() => {
			if (getCookie('token')) {
				history('/');
			}
		});
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
				{error.password && <span className='login-form__span-error'>User name or password is incorrect</span>}
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
