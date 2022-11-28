import React from 'react';
import List from './list';
import styled from 'styled-components';

const Container = styled.div`
	padding: ${props => props.theme.paddingSizes.block};
`;
function Lists({ lists }) {
	return (
		<Container>
			<ul>
				{lists.map(list => (
					<List key={list.id} list={list} />
				))}
			</ul>
		</Container>
	);
}

export default Lists;
