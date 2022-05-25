import React, { useEffect, useState } from 'react';
import './TasksList.css';
import { Api } from '../../utils/Api/Api';
import Task from '../Task/Task';
import Popup from '../Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasksAction } from '../../store/reducer';
import { allTaskCountSelector, tasksSelector, tokenSelector } from '../../store/selectors';

function TasksList() {
	// const [tasks, setTasks] = useState([]);
	const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
	const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [task, setTask] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const tasks = useSelector(tasksSelector);
	const allTaskCount = useSelector(allTaskCountSelector);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllTasksAction());
		// Api.getAllTasks().then((res) => setTasks(res.message.tasks));
	}, [dispatch]);

	function handleClickAddButton() {
		setIsAddPopupOpen(true);
	}

	function handleClickUpdateButton() {
		setIsUpdatePopupOpen(true);
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

	function handleSubmitCreateTask(e) {
		e.preventDefault();
		dispatch(getAllTasksAction(name, email, task));
		onClosePopup();
		setName('');
		setEmail('');
		setTask('');
	}

	return (
		<>
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
				<form className='task-list' onSubmit={handleSubmitCreateTask} title='Add new station'>
					<h2 className='task-list__title'>Update task</h2>
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
						Update
					</button>
				</form>
			</Popup>
		</>
	);
}

export default TasksList;
