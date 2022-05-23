import './App.css';
import Header from '../Header/Header';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import AuthPage from '../AuthPage/AuthPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
	return (
		<div className='App'>
			<Header />
			<Routes>
				<Route exact path='/' element={<MainPage />} />
				<Route exact path='/signin' element={<AuthPage />} />
				<Route exact path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}

export default App;
