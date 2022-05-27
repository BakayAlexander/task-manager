import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Login from '../Login/Login';
import { checkTokenAction } from '../../store/actions';
import { tokenSelector } from '../../store/selectors';
import Footer from '../Footer/Footer';
import './App.css';
import TasksList from '../TasksList/TasksList';

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
				<Route exact path='/' element={<TasksList />} />
				<Route exact path='/login' element={<Login />} />
				<Route exact path='*' element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
