import React from 'react';
import DatePresenter from '../../../presenter/date';

function DateItem({ date }) {
	const presenter = new DatePresenter(date);
	const isUpcoming = presenter.getDate().includes('D');

	return (
		<div className='flex flex-col items-center basis-20'>
			<span className={isUpcoming ? 'text-orange-600' : ''}>
				{presenter.getDate()}
			</span>
			<span className={isUpcoming ? 'text-orange-600' : ''}>
				{presenter.getWeek()}
			</span>
		</div>
	);
}
export default DateItem;
