import React from 'react';
import './MainPage.css';
import { Api } from '../../utils/Api/Api';
import TasksList from '../TasksList/TasksList';

function MainPage() {
	function handleClick() {
		Api.getAllTasks().then((res) => console.log(res));
		// Api.createTask('Alexander Bakay', 'test@mail.com', 'So, this is my second test text').then((res) =>
		// 	console.log(res)
		// );
	}

	return (
		<section className='main-page'>
			{/* MainPage
			<button onClick={handleClick}>Add task</button> */}
			<TasksList />
		</section>
	);
}

export default MainPage;
