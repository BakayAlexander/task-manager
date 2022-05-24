import React from 'react';
import './Task.css';

function Task({ taskData }) {
	const { id, username, email, text, status } = taskData;
	return (
		<li className='task'>
			<p className='task__item'>{id}</p>
			<p className='task__item'>{username}</p>
			<p className='task__item'>{email}</p>
			<p className='task__item'>{text}</p>
			<p className='task__item'>{status}</p>
		</li>
	);
}

export default Task;
