import React from 'react';
import List from './list';
import { useQuery } from '@tanstack/react-query';
import { getLists } from '../services/database';

function Lists({ handleDisplayLists, isPageCollapsed }) {
	const {
		isLoading,
		error,
		data: schedules,
	} = useQuery(['schedules'], getLists);

	return (
		<div className=''>
			<ul>
				{schedules &&
					schedules.map(schedule => {
						return (
							<List
								handleDisplayLists={handleDisplayLists}
								isPageCollapsed={isPageCollapsed}
								key={schedule.id}
								list={schedule}
							/>
						);
					})}
			</ul>
		</div>
	);
}

export default Lists;
