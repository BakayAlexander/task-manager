import { combineReducers } from 'redux';
import { actions } from './actions';

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
		case actions.LOADING:
			return { ...state, isLoading: action.data };
		case actions.SET_ALL_TASKS:
			return {
				...state,
				tasks: action.data.tasks,
				allTaskCount: +action.data.total_task_count,
			};
		case actions.SET_TASK:
			const newArrayAdd = [...state.tasks];
			if (newArrayAdd.length < 3) {
				newArrayAdd.push(action.data);
			}
			const newCount = ++state.allTaskCount;
			return { ...state, tasks: newArrayAdd, allTaskCount: newCount };
		case actions.UPDATE_TASK:
			const index = state.tasks.findIndex((el) => el.id === action.data.id);
			const newArray = [...state.tasks];
			newArray[index].text = action.data.text;
			newArray[index].status = action.data.status;
			return { ...state, tasks: newArray };

		case actions.LOGIN_ERROR:
			return { ...state, errorsLogin: action.data };
		case actions.SET_TOKEN:
			return { ...state, token: action.data };
		default:
			return state;
	}
};

export const loadingActionCreator = (data) => ({
	type: actions.LOADING,
	data,
});

export const allTasksActionCreator = (data) => ({
	type: actions.SET_ALL_TASKS,
	data,
});

export const newTaskActionCreator = (data) => ({
	type: actions.SET_TASK,
	data,
});

export const updateTaskActionCreator = (data) => ({
	type: actions.UPDATE_TASK,
	data,
});

export const errorLoginActionCreator = (data) => ({
	type: actions.LOGIN_ERROR,
	data,
});

export const tokenActionCreator = (data) => ({
	type: actions.SET_TOKEN,
	data,
});

export const rootReducer = combineReducers({
	reducer,
});
