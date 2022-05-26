import { combineReducers } from 'redux';

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

export const rootReducer = combineReducers({
	reducer,
});
