import React, { useState } from 'react';
import FormSchedule from './form/form-schedule';
import FormContainer from './form/container';

const _defaultForm = {
	title: '',
	howMany: '',
	date:
		String(new Date().getFullYear()) +
		'-' +
		getFullDateFormat(new Date().getMonth() + 1) +
		'-' +
		getFullDateFormat(new Date().getDate()),
	place: '',
	people: '',
	code: '',
};

function getFullDateFormat(monthOrDate) {
	if (monthOrDate < 10) {
		return String('0' + monthOrDate);
	} else {
		return String(monthOrDate);
	}
}

function AddScheduleForm({ toggleDialog, handleAddSchedule }) {
	const [form, setForm] = useState(_defaultForm);

	function handleInputChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		setForm(prev => {
			return { ...prev, [name]: value };
		});
	}

	return (
		<div className=''>
			<FormContainer
				formTitle='모임 추가'
				onCancelCallback={toggleDialog}
				onSubmitCallback={() => handleAddSchedule(form)}
			>
				<FormSchedule form={form} handleInputChange={handleInputChange} />
			</FormContainer>
		</div>
	);
}

export default AddScheduleForm;
