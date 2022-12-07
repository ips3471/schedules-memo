import React from 'react';
import DatePresenter from '../../presenter/date';

function DateItem({ date }) {
	const presenter = new DatePresenter(date);

	return (
		<span className=''>
			<span className=''>
				{presenter.getMonth() + ' ' + presenter.getDay()}
			</span>
			<span className=''>{presenter.getWeek()}</span>
		</span>
	);
}
export default DateItem;
