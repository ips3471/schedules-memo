import React from 'react';
import List from './list';

function Lists({ schedules, setSelectedList }) {
	return (
		<div className=''>
			<ul>
				{schedules &&
					schedules.map(schedule => {
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
