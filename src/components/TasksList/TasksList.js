import React, { useEffect, useState } from 'react';
import './TasksList.css';
import { Api } from '../../utils/Api/Api';
import Task from '../Task/Task';

function TasksList() {
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		Api.getAllTasks().then((res) => setTasks(res.message.tasks));
	}, []);

	console.log(tasks);

	return (
		<ul className='tasks-list'>
			{tasks.map((task) => (
				<Task key={task.id} taskData={task} />
			))}
		</ul>
	);
}

export default TasksList;
