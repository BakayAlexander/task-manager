import './App.css';
import Header from '../Header/Header';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Login from '../Login/Login';
import { checkTokenAction } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { tokenSelector } from '../../store/selectors';

function App() {
	const dispatch = useDispatch();
	const token = useSelector(tokenSelector);

	useEffect(() => {
		dispatch(checkTokenAction());
	}, [token, dispatch]);

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route exact path='/' element={<MainPage />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}

export default App;
