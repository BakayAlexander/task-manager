import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, loginAction } from '../../store/reducerFunctions';
import { errorLoginSelector } from '../../store/selectors';
import './Login.css';

function Login() {
	const dispatch = useDispatch();
	const history = useNavigate();
	const error = useSelector(errorLoginSelector);

	const initialState = {
		login: '',
		password: '',
	};

	const [authValues, setAuthValues] = useState(initialState);

	const handleChangeValue = (e) => {
		const { name, value } = e.target;
		setAuthValues({ ...authValues, [name]: value });
	};

	function handleSubmit(e) {
		e.preventDefault();
		dispatch(loginAction(authValues.login, authValues.password)).then(() => {
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
						name='login'
						value={authValues.login}
						onChange={handleChangeValue}
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
						name='password'
						value={authValues.password}
						onChange={handleChangeValue}
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

export default React.memo(Login);
