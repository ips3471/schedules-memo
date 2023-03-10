import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { ListsProps } from '../types/components/components';
import { Schedule } from '../types/interfaces/interfaces';
import List from './list';

function Schedules({
	children,
	onDelete,
	onUpdate,
	onSelect,
	selected,
}: ListsProps) {
	const { user } = useAuthContext();

	const sortSchedulesByDate = (a: Schedule, b: Schedule) => {
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
		<div className='flex-1 overflow-y-scroll'>
			<ul>
				{children &&
					user &&
					children.sort(sortSchedulesByDate).map(schedule => {
						return (
							<List
								selected={selected}
								onSelect={onSelect}
								onUpdate={onUpdate}
								key={schedule.id}
								list={schedule}
								onDelete={onDelete}
							/>
						);
					})}
				{!user && (
					<div className='p-5 '> 로그인 후에 리스트 확인이 가능합니다.</div>
				)}
			</ul>
		</div>
	);
}

export default Schedules;
