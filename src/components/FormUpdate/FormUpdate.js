import React from 'react';
import './FormUpdate.css';

function FormUpdate({ onSubmit, onChangeValue, statusUpdateValue, taskUpdateValue, selectOptions }) {
	return (
		<form className='form-update' onSubmit={onSubmit} title='Add new station'>
			<h2 className='form-update__title'>Update task</h2>
			<label className='form-update__label'>
				Status:
				<select className='form-update__select' name='statusUpdate' value={statusUpdateValue} onChange={onChangeValue}>
					{selectOptions.map((option) => {
						return (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						);
					})}
				</select>
			</label>
			<label className='form-update__label'>
				Task:
				<textarea
					className='form-update__textarea'
					type='text'
					placeholder='Please enter task'
					name='taskUpdate'
					value={taskUpdateValue}
					onChange={onChangeValue}
				></textarea>
			</label>
			<button className='form-update__submit-button' type='submit'>
				Update
			</button>
		</form>
	);
}

export default FormUpdate;
