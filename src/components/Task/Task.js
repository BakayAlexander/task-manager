import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Task.css';
import editButton from '../../images/edit_button.svg';
import { tokenSelector } from '../../store/selectors';
import { selectOptions } from '../../utils/config';

function Task({ taskData, onEdit }) {
	const { id, username, email, text, status } = taskData;
	const token = useSelector(tokenSelector);
	const [statusName, setStatusName] = useState('');

	useEffect(() => {
		const array = selectOptions.filter((statusObj) => {
			return statusObj.value === status;
		});
		setStatusName(array[0].label);
	}, [status]);

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
