import React from 'react';

function FormSchedule({ handleInputChange, form }) {
	function Input(type, placeholder, name, currDate) {
		return (
			<input
				type={type}
				placeholder={placeholder}
				onChange={handleInputChange}
				name={name}
				value={form[name]}
				min={type === 'date' ? currDate : ''}
				autoComplete='off'
				required
			></input>
		);
	}
	return (
		<div>
			<div>
				<div className=''>
					{new Input('text', '모임 이름', 'title')}
					{new Input('number', '참여자 수', 'howMany')}
					{new Input('text', '참여자 이름(콤마로 구분, 모임장부터)', 'people')}
					{new Input('date', '', 'date', new Date().toISOString().slice(0, 10))}
					{new Input('text', '숙소 이름', 'place')}
					{new Input('text', '참여코드', 'code')}
				</div>
			</div>
		</div>
	);
}
export default FormSchedule;
