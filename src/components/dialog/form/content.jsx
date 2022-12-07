import React, { useState } from 'react';
import FormButton from './button';

function FormSchedule({ handleInputChange, handleSubmit, form, popUpDialog }) {
	const [isComplete, setIsComplete] = useState(false);

	function _observeFormComplete() {
		for (let input of Object.values(form)) {
			if (!input && !isComplete) return;

			if (isComplete && !input) {
				setIsComplete(false);
			} else {
				!isComplete && setIsComplete(true);
			}
		}
	}
	return (
		<div>
			<div>
				<form onSubmit={e => handleSubmit(e, isComplete)} className=''>
					<input
						type='text'
						placeholder='모임 이름'
						onKeyUp={_observeFormComplete}
						onChange={handleInputChange}
						name='title'
						value={form.title}
					/>
					<input
						type='number'
						placeholder='참여자 수'
						onKeyUp={_observeFormComplete}
						onChange={handleInputChange}
						name='howMany'
						value={form.howMany}
					/>
					<input
						type='text'
						placeholder='참여자 이름(콤마로 구분, 가장 앞이 모임장)'
						onKeyUp={_observeFormComplete}
						onChange={handleInputChange}
						name='people'
						value={form.people}
					/>
					<input
						type='date'
						name='date'
						value={form.date}
						required
						min='2022-11-28'
						max='2030-12-31'
						onKeyUp={_observeFormComplete}
						onChange={handleInputChange}
					/>
					<input
						type='text'
						maxLength={12}
						required
						placeholder='숙소 이름'
						onKeyUp={_observeFormComplete}
						onChange={handleInputChange}
						name='place'
						value={form.place}
					/>
					<input
						type='text'
						maxLength={12}
						required
						placeholder='참여코드'
						onKeyUp={_observeFormComplete}
						onChange={handleInputChange}
						name='code'
						value={form.code}
					/>
					<div>
						<FormButton
							name='취소'
							type='button'
							callback={() => {
								popUpDialog();
							}}
						/>
						<FormButton
							name='확인'
							type='submit'
							callback={e => {
								handleSubmit(e, isComplete);
							}}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
export default FormSchedule;
