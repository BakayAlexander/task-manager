import React, { useState } from 'react';
import './TasksList.css';
import Task from '../Task/Task';
import Popup from '../Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAction, updateTaskAction } from '../../store/reducer';
import { tasksSelector, tokenSelector } from '../../store/selectors';
import SortPanel from '../SortPanel/SortPanel';

function TasksList() {
	const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
	const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [task, setTask] = useState('');
	const [taskUpdate, setTaskUpdate] = useState('');
	const [statusUpdate, setStatusUpdate] = useState('');
	const [idUpdate, setIdUpdate] = useState('');

	const tasks = useSelector(tasksSelector);
	const token = useSelector(tokenSelector);
	const dispatch = useDispatch();

	function handleClickAddButton() {
		setIsAddPopupOpen(true);
	}

	function handleClickUpdateButton(id, status, task) {
		setIsUpdatePopupOpen(true);
		setIdUpdate(id);
		setStatusUpdate(status);
		setTaskUpdate(task);
	}

	function onClosePopup() {
		setIsAddPopupOpen(false);
		setIsUpdatePopupOpen(false);
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

	function handleChangeTaskUpdate(e) {
		setTaskUpdate(e.target.value);
	}

	function handleChangeStatusUpdate(e) {
		setStatusUpdate(e.target.value);
	}

	function handleSubmitCreateTask(e) {
		e.preventDefault();
		dispatch(createTaskAction(name, email, task));
		onClosePopup();
		setName('');
		setEmail('');
		setTask('');
	}

	function handleSubmitUpdateTask(e) {
		e.preventDefault();
		dispatch(updateTaskAction(taskUpdate, Number(statusUpdate), token, idUpdate));
		onClosePopup();
	}

	return (
		<>
			<SortPanel />
			<div className='tasks-list__container-button'>
				<button className='tasks-list__add-button' onClick={handleClickAddButton}>
					Add task
				</button>
			</div>
			<ul className='tasks-list'>
				{tasks.map((task) => (
					<Task key={task.id} taskData={task} onEdit={handleClickUpdateButton} />
				))}
			</ul>
			<Popup isOpen={isAddPopupOpen} onClose={onClosePopup}>
				<form className='task-list' onSubmit={handleSubmitCreateTask} title='Add new station'>
					<h2 className='task-list__title'>Add new task</h2>
					<label className='task-list__label'>
						Username:
						<input
							className='task-list__input'
							id='name-input'
							type='text'
							autoComplete='none'
							placeholder='Please enter name'
							required
							value={name ?? ''}
							onChange={handleChangeName}
						></input>
					</label>
					<label className='task-list__label'>
						Email:
						<input
							className='task-list__input'
							id='comment-input'
							type='email'
							pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
							autoComplete='none'
							placeholder='Please enter email'
							required
							value={email ?? ''}
							onChange={handleChangeEmail}
						></input>
					</label>
					<label className='task-list__label'>
						Task:
						<input
							className='task-list__input'
							id='comment-input'
							type='text'
							autoComplete='none'
							placeholder='Please enter task'
							required
							value={task ?? ''}
							onChange={handleChangeTask}
						></input>
					</label>
					<button className='task-list__submit-button' type='submit'>
						Add new task
					</button>
				</form>
			</Popup>
			<Popup isOpen={isUpdatePopupOpen} onClose={onClosePopup}>
				<form className='task-list' onSubmit={handleSubmitUpdateTask} title='Add new station'>
					<h2 className='task-list__title'>Update task</h2>
					<label className='task-list__label'>
						Status:
						<select className='task-list__select' value={statusUpdate} onChange={handleChangeStatusUpdate}>
							<option value={0}>Not completed. Not edited.</option>
							<option value={1}>Not completed. Edited.</option>
							<option value={10}>Completed. Not edited.</option>
							<option value={11}>Completed. Edited.</option>
						</select>
					</label>
					<label className='task-list__label'>
						Task:
						<textarea
							className='task-list__textarea'
							type='text'
							placeholder='Please enter task'
							value={taskUpdate ?? ''}
							onChange={handleChangeTaskUpdate}
						></textarea>
					</label>
					<button className='task-list__submit-button' type='submit'>
						Update
					</button>
				</form>
			</Popup>
		</>
	);
}

export default TasksList;
