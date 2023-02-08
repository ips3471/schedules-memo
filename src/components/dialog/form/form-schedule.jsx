import React from 'react';

function FormSchedule({ handleInputChange, form }) {
	function Input(type, placeholder, name, currDate, isRequre = true) {
		return (
			<input
				type={type}
				placeholder={placeholder}
				onChange={handleInputChange}
				name={name}
				value={form[name]}
				min={type === 'date' ? currDate : ''}
				max={
					type === 'date'
						? Number(currDate.slice(0, 4)) + 1 + currDate.slice(4)
						: ''
				}
				autoComplete='off'
				required={isRequre}
			></input>
		);
	}
	return (
		<div>
			<div>
				<div className=''>
					{new Input('date', '', 'date', new Date().toISOString().slice(0, 10))}
					{new Input('text', '출발장소', 'from')}
					{new Input('text', '도착장소', 'to')}
					{new Input('text', '출발시간', 'time')}
					{new Input('number', '리워드', 'reward')}
					{new Input('text', '요청사항', 'mission', '', false)}
				</div>
			</div>
		</div>
	);
}
export default FormSchedule;
