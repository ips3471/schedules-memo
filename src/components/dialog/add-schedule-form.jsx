import React, { useState } from 'react';
import SubmitPresenter from '../../presenter/submit';
import FormSchedule from './form/content';
import FormHeader from './form/header';
import FormButton from './form/button';

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

	function handleSubmit() {
		const presenter = new SubmitPresenter(form);
		if (!presenter.checkValidities()) return;
		presenter.addSchedule();
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
		<form
			onSubmit={e => {
				e.preventDefault();
				handleSubmit();
			}}
			className=''
		>
			<FormHeader title='모임추가' />
			<FormSchedule handleInputChange={handleInputChange} form={form} />
			<div className='flex justify-between'>
				<FormButton
					name='취소'
					type='button'
					callback={() => {
						popUpDialog();
					}}
				/>
				<FormButton name='확인' type='submit' />
			</div>
		</form>
	);
}

export default AddScheduleForm;
