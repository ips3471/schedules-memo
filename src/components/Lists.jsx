import React, { useState } from 'react';
import List from './list';
import styled from 'styled-components';

const Container = styled.div`
	padding-top: ${props => props.theme.paddingSizes.block};
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
