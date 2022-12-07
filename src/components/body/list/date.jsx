import React from 'react';
import DatePresenter from '../../../presenter/date';

function DateItem({ date }) {
	const presenter = new DatePresenter(date);

	return (
		<div className='flex flex-col items-center basis-20'>
			<span className=''>{presenter.getDate()}</span>
			<span className=''>{presenter.getWeek()}</span>
		</div>
	);
}
export default DateItem;
