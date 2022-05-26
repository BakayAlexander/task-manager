import { Api } from '../utils/Api/Api';
import { setAllTasks, setErrorLogin, setLoading, setNewTask, setTaskError, setToken, setUpdateTask } from './reducer';

export const getAllTasksAction = (field, direction, page) => async (dispatch) => {
	try {
		console.log('first');
		dispatch(setLoading(true));
		const data = await Api.getAllTasks(field, direction, page);
		if (data.status === 'ok') dispatch(setAllTasks(data.message));
		dispatch(setLoading(false));
	} catch (error) {}
};

export const createTaskAction = (username, email, text) => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		const data = await Api.createTask(username, email, text);
		if (data.status === 'ok') dispatch(setNewTask(data.message));
		else if (data.status === 'error') dispatch(setTaskError(data.message));
		dispatch(setLoading(false));
	} catch (error) {}
};

export const updateTaskAction = (text, status, token, id) => async (dispatch) => {
	try {
		const data = await Api.updateTask(text, status, token, id);
		if (data.status === 'ok') dispatch(setUpdateTask({ text, status, id }));
		else if (data.status === 'error' && data.message === 'Token is invalid or expired')
			localStorage.removeItem('token');
	} catch (error) {}
};

export const loginAction = (username, password) => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		const data = await Api.login(username, password);
		dispatch(setErrorLogin({}));
		if (data.status === 'ok') {
			dispatch(setToken(data.message.token));
			localStorage.setItem('token', data.message.token);
		} else if (data.status === 'error') {
			localStorage.removeItem('token');
			dispatch(setErrorLogin(data.message));
		}
		dispatch(setLoading(false));
	} catch (error) {}
};

export const checkTokenAction = () => async (dispatch) => {
	try {
		const token = localStorage.getItem('token');
		if (token) {
			dispatch(setToken(token));
		} else if (!token) {
			dispatch(setErrorLogin({}));
		}
	} catch (error) {}
};

export const logoutAction = () => async (dispatch) => {
	try {
		dispatch(setToken(null));
		localStorage.removeItem('token');
	} catch (error) {}
};
