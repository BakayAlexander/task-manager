import './App.css';
import Header from '../Header/Header';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Login from '../Login/Login';
import { checkTokenAction } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { tokenSelector } from '../../store/selectors';
import Footer from '../Footer/Footer';

function App() {
	const dispatch = useDispatch();
	const token = useSelector(tokenSelector);
	const history = useNavigate();
	const currentPath = useLocation();

	useEffect(() => {
		const path = currentPath.pathname;
		dispatch(checkTokenAction());
		history(path);
	}, [token, dispatch]);

	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route exact path='/' element={<MainPage />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='*' element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
