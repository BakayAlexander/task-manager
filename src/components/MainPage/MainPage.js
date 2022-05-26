import React from 'react';
import './MainPage.css';
import TasksList from '../TasksList/TasksList';

function MainPage() {
	return (
		<section className='main-page'>
			<TasksList />
		</section>
	);
}

export default MainPage;
