import React from 'react';
import List from './list';

function Lists({ schedules, setSelectedList }) {
	const sortSchedulesByDate = (a, b) => {
		return convertDateToCompareWith(b.date) - convertDateToCompareWith(a.date);

		function convertDateToCompareWith(dateFormat) {
			return Number(
				dateFormat.slice(0, 4) +
					dateFormat.slice(5, 7) +
					dateFormat.slice(8, 10),
			);
		}
	};
	const sortSchedulesByState = (a, b) => {
		return a.state.localeCompare(b.state);
	};

	return (
		<div className=''>
			<ul>
				{schedules &&
					schedules
						.sort(sortSchedulesByDate)
						.sort(sortSchedulesByState)
						.map(schedule => {
							return (
								<List
									key={schedule.id}
									list={schedule}
									setSelectedList={setSelectedList}
								/>
							);
						})}
			</ul>
		</div>
	);
}

export default Lists;
