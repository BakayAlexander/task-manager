import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTaskAction, updateTaskAction } from '../../store/actions';
import { isLoadingSelector, tasksSelector, tokenSelector } from '../../store/selectors';
import SortPanel from '../SortPanel/SortPanel';
import Preloader from '../Preloader/Preloader';
import './TasksList.css';
import Task from '../Task/Task';
import Popup from '../Popup/Popup';
import { selectOptions } from '../../utils/config';
import FormUpdate from '../FormUpdate/FormUpdate';
import FormAdd from '../FormAdd/FormAdd';

function TasksList() {
	const dispatch = useDispatch();
	const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
	const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
	const tasks = useSelector(tasksSelector);
	const token = useSelector(tokenSelector);
	const isLoading = useSelector(isLoadingSelector);

	const initialState = {
		name: '',
		email: '',
		task: '',
		taskUpdate: '',
		statusUpdate: '',
		idUpdate: '',
	};

	const [taskValues, setTaskValues] = useState(initialState);

	const changeValue = (e) => {
		const { name, value } = e.target;
		setTaskValues({ ...taskValues, [name]: value });
	};

	function handleClickAddButton() {
		setIsAddPopupOpen(true);
	}

	function handleClickUpdateButton(id, status, task) {
		setIsUpdatePopupOpen(true);
		setTaskValues({ ...taskValues, idUpdate: id, statusUpdate: status, taskUpdate: task });
	}

	function onClosePopup() {
		setIsAddPopupOpen(false);
		setIsUpdatePopupOpen(false);
	}

	function handleSubmitCreateTask(e) {
		e.preventDefault();
		dispatch(createTaskAction(taskValues.name, taskValues.email, taskValues.task));
		onClosePopup();
		setTaskValues({ ...taskValues, name: '', email: '', task: '' });
	}

	function handleSubmitUpdateTask(e) {
		e.preventDefault();
		dispatch(updateTaskAction(taskValues.taskUpdate, Number(taskValues.statusUpdate), token, taskValues.idUpdate));
		onClosePopup();
	}

	return (
		<>
			<SortPanel />
			<button className='tasks-list__add-button' onClick={handleClickAddButton}>
				Add new task
			</button>
			{isLoading ? (
				<Preloader />
			) : (
				<ul className='tasks-list'>
					{tasks.map((task) => (
						<Task key={task.id} taskData={task} onEdit={handleClickUpdateButton} />
					))}
				</ul>
			)}
			<Popup isOpen={isAddPopupOpen} onClose={onClosePopup}>
				<FormAdd
					onSubmit={handleSubmitCreateTask}
					nameValue={taskValues.name}
					emailValue={taskValues.email}
					taskValue={taskValues.task}
					onChangeValue={changeValue}
				/>
			</Popup>
			<Popup isOpen={isUpdatePopupOpen} onClose={onClosePopup}>
				<FormUpdate
					onSubmit={handleSubmitUpdateTask}
					onChangeValue={changeValue}
					statusUpdateValue={taskValues.statusUpdate}
					taskUpdateValue={taskValues.taskUpdate}
					selectOptions={selectOptions}
				/>
			</Popup>
		</>
	);
}

export default TasksList;
