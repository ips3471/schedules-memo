import React, { useState } from 'react';
import List from './list';
import styled from 'styled-components';

const Container = styled.div`
	padding-top: ${props => props.theme.paddingSizes.block};
`;
function Lists({ lists, movePageTo }) {
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
	return (
		<Container>
			<ul>
				{lists &&
					lists.map(list => {
						const receiptsContained = initReceipts(list);
						return (
							<List
								key={list.id}
								list={receiptsContained}
								movePageTo={movePageTo}
							/>
						);
					})}
			</ul>
		</Container>
	);
}

export default Lists;
