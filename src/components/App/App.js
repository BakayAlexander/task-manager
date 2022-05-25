import './App.css';
import Header from '../Header/Header';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Login from '../Login/Login';
import { checkTokenAction } from '../../store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isLoadingSelector, tokenSelector } from '../../store/selectors';
import Preloader from '../Preloader/Preloader';

function App() {
	const dispatch = useDispatch();
	const token = useSelector(tokenSelector);
	const isLoading = useSelector(isLoadingSelector);

	useEffect(() => {
		dispatch(checkTokenAction());
	}, [dispatch]);

	return (
		<div className='App'>
			<Header />
			{isLoading ? (
				<Preloader />
			) : (
				<Routes>
					<Route exact path='/' element={<MainPage />} />
					<Route exact path='/login' element={<Login />} />
					<Route exact path='*' element={<NotFoundPage />} />
				</Routes>
			)}
		</div>
	);
}

export default App;
