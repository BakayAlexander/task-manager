import { Api } from '../utils/Api/Api';
import { setAllTasks, setErrorLogin, setLoading, setNewTask, setTaskError, setToken, setUpdateTask } from './reducer';

export const getCookie = (name) => {
	const allCookies = document.cookie.split('; ');
	const res = allCookies.find((item) => item.match(`${name}=`));
	console.log(name);
	if (res) {
		const indexOfSlice = res.indexOf('=');
		return res ? res.slice(indexOfSlice + 1) : undefined;
	}
	return;
};

export const getAllTasksAction = (field, direction, page) => async (dispatch) => {
	try {
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
			document.cookie = `token=; path=/; max-age=0`;
	} catch (error) {}
};

export const loginAction = (username, password) => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		const data = await Api.login(username, password);
		dispatch(setErrorLogin({}));
		if (data.status === 'ok') {
			dispatch(setToken(data.message.token));
			document.cookie = `token=${data.message.token}; path=/; max-age=86400`;
		} else if (data.status === 'error') {
			document.cookie = `token=; path=/; max-age=0`;
			dispatch(setErrorLogin(data.message));
		}
		dispatch(setLoading(false));
	} catch (error) {}
};

export const checkTokenAction = () => async (dispatch) => {
	try {
		const token = getCookie('token');
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
		document.cookie = `token=; path=/; max-age=0`;
	} catch (error) {}
};
