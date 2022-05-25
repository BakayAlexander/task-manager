import { combineReducers } from 'redux';
import { Api } from '../utils/Api/Api';

let defaultState = {
	isLoading: false,
	tasks: [],
	token: null,
	allTaskCount: null,
	errorsAddForm: {},
	errorsLogin: {},
};

export const reducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'LOADNIG':
			return { ...state, isLoading: action.data };
		case 'SET_ALL_TASKS':
			return {
				...state,
				tasks: action.data.tasks,
				allTaskCount: +action.data.total_task_count,
			};
		case 'SET_TASK':
			const newArrayAdd = [...state.tasks];
			if (newArrayAdd.length < 3) newArrayAdd.push(action.data);
			const newCount = ++state.allTaskCount;
			return { ...state, tasks: newArrayAdd, allTaskCount: newCount };
		case 'TASK_ERROR':
			return { ...state, errorsAddForm: action.data };
		case 'UPDATE_TASK':
			const index = state.tasks.findIndex((el) => el.id === action.data.id);
			const newArray = [...state.tasks];
			newArray[index].text = action.data.text;
			newArray[index].status = action.data.status;
			return { ...state, tasks: newArray };

		case 'LOGIN_ERROR':
			return { ...state, errorsLogin: action.data };
		case 'SET_TOKEN':
			return { ...state, token: action.data };
		case 'CHECK_TOKEN':
			return { ...state, token: action.data };

		default:
			return state;
	}
};

export const setLoading = (data) => ({
	type: 'LOADNIG',
	data,
});

export const setAllTasks = (data) => ({
	type: 'SET_ALL_TASKS',
	data,
});

export const setNewTask = (data) => ({
	type: 'SET_TASK',
	data,
});

export const setTaskError = (data) => ({
	type: 'TASK_ERROR',
	data,
});

export const setUpdateTask = (data) => ({
	type: 'UPDATE_TASK',
	data,
});

export const setErrorLogin = (data) => ({
	type: 'LOGIN_ERROR',
	data,
});

export const setToken = (data) => ({
	type: 'SET_TOKEN',
	data,
});

export const getAllTasksAction = () => async (dispatch) => {
	try {
		dispatch(setLoading(true));
		const data = await Api.getAllTasks();
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
		dispatch(setLoading(true));
		const token = localStorage.getItem('token');
		if (token) {
			dispatch(setToken(token));
		} else if (!token) {
			dispatch(setErrorLogin({}));
		}
		dispatch(setLoading(false));
	} catch (error) {}
};

export const rootReducer = combineReducers({
	reducer,
});

//!Добавить logout
