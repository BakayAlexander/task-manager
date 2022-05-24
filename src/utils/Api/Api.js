import * as axios from 'axios';
import { BASE_DEVELOPER, BASE_URL } from '../config';

const instance = axios.create({
	baseURL: BASE_URL,
});

export const Api = {
	getAllTasks(sortField, sortDirection, page) {
		return instance.get(`${BASE_DEVELOPER}`, {}).then((res) => res.data);
	},

	createTask(username, email, text) {
		let form = new FormData();
		form.append('username', username);
		form.append('email', email);
		form.append('text', text);
		return instance
			.post(`create/${BASE_DEVELOPER}`, form, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((res) => res.data);
	},
};
