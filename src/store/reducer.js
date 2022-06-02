import { combineReducers } from 'redux';
import { actions } from './action';

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
		case actions.TASK_ERROR:
			return { ...state, errorsAddForm: action.data };
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

export const rootReducer = combineReducers({
	reducer,
});
