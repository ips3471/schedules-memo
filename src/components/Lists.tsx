import React from 'react';
import { ListsProps } from '../types/components/components';
import { ScheduleWithId } from '../types/interfaces/interfaces';
import List from './list';

function Schedules({ lists }: ListsProps) {
	const sortSchedulesByDate = (a: ScheduleWithId, b: ScheduleWithId) => {
		return convertDateToCompareWith(a.date) - convertDateToCompareWith(b.date);

		function convertDateToCompareWith(dateFormat: string) {
			return Number(
				dateFormat.slice(0, 4) +
					dateFormat.slice(5, 7) +
					dateFormat.slice(8, 10),
			);
		}
	};

	return (
		<div className='flex-1'>
			<ul>
				{lists &&
					lists.sort(sortSchedulesByDate).map(schedule => {
						return <List key={schedule.id} list={schedule} />;
					})}
			</ul>
		</div>
	);
}

export default Schedules;
