import React from 'react';
import './Task.css';
import editButton from '../../images/edit_button.svg';
import { useSelector } from 'react-redux';
import { tokenSelector } from '../../store/selectors';

function Task({ taskData, onEdit }) {
	const { id, username, email, text, status } = taskData;
	const token = useSelector(tokenSelector);

	let statusName = 'Status is not defined';
	if (status === 0) {
		statusName = 'Not completed. Not edited.';
	} else if (status === 1) {
		statusName = 'Not completed. Edited.';
	} else if (status === 10) {
		statusName = 'Completed. Not edited.';
	} else if (status === 11) {
		statusName = 'Completed. Edited.';
	}

	function handleEditTask(e) {
		e.preventDefault();
		onEdit(id, status, text);
	}

	return (
		<li className={`task task_${status}`}>
			{token && (
				<button className='task__button-edit' onClick={handleEditTask}>
					<img src={editButton} alt='Кнопка Редактировать' className='profile__edit-pic' />
				</button>
			)}

			<div className='task__status-container'>
				<p className='task__item'>
					<span className='task__item-title'>Task number: </span>
					{id}
				</p>
				<p className='task__item'>
					<span className='task__item-title'>Status: </span>
					{statusName}
				</p>
			</div>
			<div className='task__user-container'>
				<p className='task__item'>
					<span className='task__item-title'>Creared by: </span>
					{username}
				</p>
				<p className='task__item'>
					<span className='task__item-title'>Email: </span>
					{email}
				</p>
			</div>
			<div className='task__task-container'>
				<p className='task__item'>
					<span className='task__item-title'>Task: </span>
					{text}
				</p>
			</div>
		</li>
	);
}

export default Task;
