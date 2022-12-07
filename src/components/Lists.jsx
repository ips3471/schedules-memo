import React, { useState } from 'react';
import List from './list';
import { useQuery } from '@tanstack/react-query';
import { getLists } from '../services/database';
import AddScheduleForm from './dialog/add-schedule-form';
import AppButton from './button/button';

function initReceipts(list) {
	if (!list.receipts) {
		return {
			...list,
			receipts: {
				mart: [],
				car: [],
				ticket: [],
				reservation: [],
				food: [],
			},
		};
	}

	let receipts = { ...list.receipts };

	if (!list.receipts.mart) {
		receipts = { ...receipts, mart: [] };
	}
	if (!list.receipts.car) {
		receipts = { ...receipts, car: [] };
	}
	if (!list.receipts.ticket) {
		receipts = { ...receipts, ticket: [] };
	}
	if (!list.receipts.reservation) {
		receipts = { ...receipts, reservation: [] };
	}
	if (!list.receipts.food) {
		receipts = { ...receipts, food: [] };
	}
	return { ...list, receipts };
}

function Lists({ handleWhichPage }) {
	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const {
		isLoading,
		error,
		data: schedules,
	} = useQuery(['schedules'], getLists);

	function popUpDialog() {
		setIsAddFormOpen(!isAddFormOpen);
	}
	return (
		<div className=''>
			<ul>
				{schedules &&
					schedules.map(schedule => {
						return (
							<List
								handleWhichPage={handleWhichPage}
								key={schedule.id}
								list={initReceipts(schedule)}
							/>
						);
					})}
			</ul>
			<div className='w-full text-center sticky bottom-0'>
				<AppButton
					name='모임 추가'
					callback={() => {
						setIsAddFormOpen(true);
					}}
				/>
			</div>
			{isAddFormOpen && (
				<div>
					<AddScheduleForm
						setIsDialogOpen={setIsAddFormOpen}
						popUpDialog={popUpDialog}
					/>
				</div>
			)}
		</div>
	);
}

export default Lists;
