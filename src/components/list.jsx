import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	.list__location {
		display: flex;
		flex-direction: column;
		font-size: 0.8em;
	}
`;
const Button = styled.button`
	border: 1px solid darkgray;
	background-color: ${props =>
		props.state === '입장'
			? props.theme.bgColors.primary
			: props.theme.bgColors.secondary};
`;

function List({ list }) {
	const [joined, setJoined] = useState(1);
	const { title, howMany, location, date, state } = list;
	return (
		<Container>
			<div>
				<span>{date}</span>
			</div>
			<div className='list__location'>
				<span>{title}</span>
				<span>{location}</span>
			</div>
			<div>
				<span>
					{joined}/{howMany}명
				</span>
			</div>
			<div>
				<Button state={state}>{state}</Button>
			</div>
		</Container>
	);
}

export default List;
