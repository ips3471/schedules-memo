import React, { useState } from 'react';
import FormSchedule from './form/form-schedule';
import FormContainer from './form/container';
import { Schedule } from '../../types/interfaces/interfaces';
import { AddScheduleFormProps } from '../../types/components/components';

function AddScheduleForm({
	toggleDialog,
	onAddSchedule,
}: AddScheduleFormProps) {
	const [form, setForm] = useState(_defaultForm);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		const { name, value } = e.target;
		setForm(prev => {
			return { ...prev, [name]: value };
		});
	}

	const handleAddSchedule = () => {
		onAddSchedule(form);
	};

	return (
		<div className=''>
			<FormContainer
				formTitle='스케줄 추가'
				onCancelCallback={toggleDialog}
				onSubmitCallback={() => handleAddSchedule()}
			>
				<FormSchedule form={form} handleInputChange={handleInputChange} />
			</FormContainer>
		</div>
	);
}

export default AddScheduleForm;

const _defaultForm: Schedule = {
	date:
		String(new Date().getFullYear()) +
		'-' +
		getFullDateFormat(new Date().getMonth() + 1) +
		'-' +
		getFullDateFormat(new Date().getDate() + 1),
	from: '대치삼성래미안',
	to: '디지털허브치과의원',
	mission: '',
	reward: 36000,
	time: '07:40',
	id: undefined,
	uid: '',
	state: 'pending',
};

function getFullDateFormat(monthOrDate: number): string {
	if (monthOrDate < 10) {
		return String('0' + monthOrDate);
	} else {
		return String(monthOrDate);
	}
}
