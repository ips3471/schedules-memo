import React, { useState } from 'react';
import SubmitPresenter from '../../presenter/submit';
import FormSchedule from './form/content';
import FormHeader from './form/header';

const _defaultForm = {
	title: '',
	howMany: '',
	date: '',
	place: '',
	people: '',
	code: '',
};

function AddScheduleForm({ popUpDialog }) {
	const [form, setForm] = useState(_defaultForm);

	function handleSubmit(e, isComplete) {
		e.preventDefault();

		const presenter = new SubmitPresenter(form);
		if (!presenter.checkValidities()) return;
		isComplete && presenter.addSchedule();
		popUpDialog();
	}

	function handleInputChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		setForm(prev => {
			return { ...prev, [name]: value };
		});
	}

	return (
		<div>
			<FormHeader title='모임추가' />
			<FormSchedule
				handleInputChange={handleInputChange}
				handleSubmit={handleSubmit}
				form={form}
				popUpDialog={popUpDialog}
			/>
		</div>
	);
}

export default AddScheduleForm;
