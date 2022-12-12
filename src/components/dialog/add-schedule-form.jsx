import React, { useState } from 'react';
import FormSchedule from './form/content';
import FormContainer from './form/container';

const _defaultForm = {
	title: '',
	howMany: '',
	date: '',
	place: '',
	people: '',
	code: '',
};

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
		<FormContainer
			formTitle='모임 추가'
			onCancelCallback={toggleDialog}
			onSubmitCallback={() => handleAddSchedule(form)}
		>
			<FormSchedule form={form} handleInputChange={handleInputChange} />
		</FormContainer>
	);
}

export default AddScheduleForm;
