import React, { useState } from 'react';
import List from './list';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getLists } from '../services/database';

const Container = styled.div`
	padding-top: ${props => props.theme.paddingSizes.block};
`;

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
	const {
		isLoading,
		error,
		data: schedules,
	} = useQuery(['schedules'], getLists);

	return (
		<Container>
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
		</Container>
	);
}

export default Lists;
