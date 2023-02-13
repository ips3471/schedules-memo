import React from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import DatePresenter from '../../../presenter/date';

function DateItem({ date, list, onSelect, selected }) {
	const { user } = useAuthContext();
	const presenter = new DatePresenter(date);
	const isUpcoming = presenter.getDate().includes('D');

	return (
		<button
			onClick={() => {
				user.isAdmin && onSelect(list);
			}}
			className={`flex flex-col items-center gap-2 basis-16 text-sm ${
				selected === list && 'border-2 border-l-stone-500'
			}`}
		>
			<span className={isUpcoming ? 'text-orange-600' : ''}>
				{presenter.getDate()}
			</span>
			<span className={isUpcoming ? 'text-orange-600' : ''}>
				{presenter.getWeek()}
			</span>
		</button>
	);
}
export default DateItem;
