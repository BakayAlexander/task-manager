import React, { useEffect, useState } from 'react';
import './TasksList.css';
import { Api } from '../../utils/Api/Api';
import Task from '../Task/Task';
import Popup from '../Popup/Popup';

function TasksList() {
	const [tasks, setTasks] = useState([]);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [task, setTask] = useState('');

	useEffect(() => {
		Api.getAllTasks().then((res) => setTasks(res.message.tasks));
	}, []);

	function handleClickAddButton() {
		setIsPopupOpen(true);
	}

	function onClosePopup() {
		setIsPopupOpen(false);
	}

	function handleChangeName(e) {
		setName(e.target.value);
	}

	function handleChangeEmail(e) {
		setEmail(e.target.value);
	}

	function handleChangeTask(e) {
		setTask(e.target.value);
	}

	function handleSubmitCreateTask(e) {
		e.preventDefault();
		Api.createTask(name, email, task).then((res) => {
			console.log(res);
			onClosePopup();
		});
	}

	return (
		<>
			<button className='tasks-list__add-button' onClick={handleClickAddButton}>
				Add task
			</button>
			<ul className='tasks-list'>
				{tasks.map((task) => (
					<Task key={task.id} taskData={task} />
				))}
			</ul>
			<Popup isOpen={isPopupOpen} onClose={onClosePopup}>
				<form className='admin-form' onSubmit={handleSubmitCreateTask} title='Add new station'>
					<h2 className='admin-form__title'>Add new task</h2>
					<label className='admin-form__label'>
						Username:
						<input
							className='admin-form__input'
							id='name-input'
							type='text'
							autoComplete='none'
							placeholder='Please enter name'
							required
							value={name ?? ''}
							onChange={handleChangeName}
						></input>
					</label>
					<label className='admin-form__label'>
						Email:
						<input
							className='admin-form__input'
							id='comment-input'
							type='text'
							autoComplete='none'
							placeholder='Please enter email'
							required
							value={email ?? ''}
							onChange={handleChangeEmail}
						></input>
					</label>
					<label className='admin-form__label'>
						Task:
						<input
							className='admin-form__input'
							id='comment-input'
							type='text'
							autoComplete='none'
							placeholder='Please enter task'
							required
							value={task ?? ''}
							onChange={handleChangeTask}
						></input>
					</label>
					<button className='admin-form__submit-button' type='submit'>
						Add new task
					</button>
				</form>
			</Popup>
		</>
	);
}

export default TasksList;
