import React from 'react';
import './FormAdd.css';

function FormAdd({ onSubmit, nameValue, emailValue, taskValue, onChangeValue }) {
	return (
		<form className='form-add' onSubmit={onSubmit} title='Add new station'>
			<h2 className='form-add__title'>Add new task</h2>
			<label className='form-add__label'>
				Username:
				<input
					className='form-add__input'
					id='name-input'
					type='text'
					autoComplete='none'
					placeholder='Please enter name'
					required
					name='name'
					value={nameValue}
					onChange={onChangeValue}
				></input>
			</label>
			<label className='form-add__label'>
				Email:
				<input
					className='form-add__input'
					id='email-input'
					type='email'
					pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
					autoComplete='none'
					placeholder='Please enter email'
					required
					name='email'
					value={emailValue}
					onChange={onChangeValue}
				></input>
			</label>
			<label className='form-add__label'>
				Task:
				<input
					className='form-add__input'
					id='task-input'
					type='text'
					autoComplete='none'
					placeholder='Please enter task'
					required
					name='task'
					value={taskValue}
					onChange={onChangeValue}
				></input>
			</label>
			<button className='form-add__submit-button' type='submit'>
				Add new task
			</button>
		</form>
	);
}

export default FormAdd;
