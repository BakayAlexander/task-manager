import { Api } from '../utils/Api/Api';
import { actions } from './action';

export const getCookie = (name) => {
	const allCookies = document.cookie.split('; ');
	const res = allCookies.find((item) => item.match(`${name}=`));
	if (res) {
		const indexOfSlice = res.indexOf('=');
		return res ? res.slice(indexOfSlice + 1) : undefined;
	}
	return;
};

export const getAllTasksAction = (field, direction, page) => async (dispatch) => {
	try {
		dispatch({ type: actions.LOADING, data: true });
		const data = await Api.getAllTasks(field, direction, page);
		if (data.status === 'ok') {
			return dispatch({ type: actions.SET_ALL_TASKS, data: data.message });
		}
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: actions.LOADING, data: false });
	}
};

export const createTaskAction = (username, email, text) => async (dispatch) => {
	try {
		dispatch({ type: actions.LOADING, data: true });
		const data = await Api.createTask(username, email, text);
		if (data.status === 'ok') {
			return dispatch({ type: actions.SET_TASK, data: data.message });
		}
		dispatch({ type: actions.TASK_ERROR, data: data.message });
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: actions.LOADING, data: false });
	}
};

export const updateTaskAction = (text, status, token, id) => async (dispatch) => {
	try {
		const data = await Api.updateTask(text, status, token, id);
		if (data.status === 'ok') dispatch({ type: actions.UPDATE_TASK, data: { text, status, id } });
		else if (data.status === 'error' && data.message === 'Token is invalid or expired')
			document.cookie = `token=; path=/; max-age=0`;
	} catch (error) {
		console.log(error);
	}
};

export const loginAction = (username, password) => async (dispatch) => {
	try {
		dispatch({ type: actions.LOADING, data: true });
		const data = await Api.login(username, password);
		dispatch({ type: actions.LOGIN_ERROR, data: {} });
		if (data.status === 'ok') {
			dispatch({ type: actions.SET_TOKEN, data: data.message.token });
			document.cookie = `token=${data.message.token}; path=/; max-age=86400`;
			return;
		}
		document.cookie = `token=; path=/; max-age=0`;
		dispatch({ type: actions.LOGIN_ERROR, data: data.message });
	} catch (error) {
		console.log(error);
	} finally {
		dispatch({ type: actions.LOADING, data: false });
	}
};

export const checkTokenAction = () => async (dispatch) => {
	try {
		const token = getCookie('token');
		if (token) {
			dispatch({ type: actions.SET_TOKEN, data: token });
		} else if (!token) {
			dispatch({ type: actions.LOGIN_ERROR, data: 'there is no token' });
		}
	} catch (error) {
		console.log(error);
	}
};

export const logoutAction = () => async (dispatch) => {
	try {
		dispatch({ type: actions.SET_TOKEN, data: null });
		document.cookie = `token=; path=/; max-age=0`;
	} catch (error) {
		console.log(error);
	}
};
