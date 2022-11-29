import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	.list__place,
	.list__date {
		display: flex;
		flex-direction: column;
		font-size: 0.8em;
	}
	.list__place {
		width: 6.4rem;
	}
	.list__date {
		align-items: center;
		width: 3.6rem;
		font-size: 0.8em;
	}
	padding-bottom: 0.5em;
`;
const Button = styled.button`
	border: 1px solid darkgray;
	background-color: ${props =>
		props.state === '입장'
			? props.theme.bgColors.primary
			: props.theme.bgColors.secondary};
`;
const DateSpan = styled.span`
	color: ${props => (props.diffDay <= 4 ? 'orange' : '')};
`;

function List({ list }) {
	const [joined, setJoined] = useState(1);
	const { title, howMany, place, date, state } = list;
	const dateArr = new Array('일', '월', '화', '수', '목', '금', '토');
	const formatted = new Date(`20${date}`);
	const diffDay = Math.ceil((formatted - new Date()) / 1000 / 60 / 60 / 24);

	function onClick() {
		console.log(state);
	}

	console.log(diffDay);
	// console.log(new Date().getTime().toLocaleString());

	return (
		<Container>
			<DateSpan diffDay={diffDay} className='list__date'>
				<span className='month'>
					{diffDay <= 4
						? `D - ${diffDay}`
						: `${formatted.getMonth() >= 6 ? '' : '0'}${
								formatted.getMonth() + 1
						  }월
                    ${
						formatted.getDate() >= 10 ? '' : '0'
					}${formatted.getDate()}일
                    `}
				</span>
				<span className='date'>({dateArr[formatted.getDay()]})</span>
			</DateSpan>
			<div className='list__place'>
				<span>{title}</span>
				<span>{place}</span>
			</div>
			<div>
				<span>
					{joined}/{howMany}명
				</span>
			</div>
			<div>
				<Button onClick={() => onClick()} state={state}>
					{state}
				</Button>
			</div>
		</Container>
	);
}

export default List;
