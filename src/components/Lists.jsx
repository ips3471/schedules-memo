import React, { useState } from 'react';
import List from './list';
import styled from 'styled-components';
import ReceiptAdd from './receipt-add';

const Container = styled.div`
	/* padding: ${props => props.theme.paddingSizes.block}; */
	/* overflow-y: scroll; */
	/* max-height: 50%;
	overflow: scroll;
	border: 1px solid red; */
`;
function Lists({ lists, movePageTo }) {
	return (
		<Container>
			<ul>
				{lists.map(list => (
					<List key={list.id} list={list} movePageTo={movePageTo} />
				))}
			</ul>
		</Container>
	);
}

export default Lists;
