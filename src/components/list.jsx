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
	.list__date {
		align-items: center;
		width: 3.6rem;
		font-size: 0.8em;
	}
	padding-bottom: 0.5em;
`;
const Button = styled.button`
	font-size: 0.8em;
	border: 1px solid darkgray;
	background-color: ${props =>
		props.state === '입장'
			? props.theme.bgColors.primary
			: props.theme.bgColors.secondary};
`;
const DateSpan = styled.span`
	span {
		color: ${props => (props.diffDay <= 4 ? 'orange' : '')};
		font-size: 0.9em;
	}
`;
const JoinedSpan = styled.span`
	flex-basis: 2.5em;
	text-align: right;
	span {
		font-size: 0.8em;
	}
`;
const PlaceSpan = styled.span`
	span {
		font-size: 0.9em;
		width: 6.6rem;
	}
`;

function List({ list, movePageTo }) {
	const { title, howMany, place, date, state } = list;
	const dateArr = new Array('일', '월', '화', '수', '목', '금', '토');
	const formatted = new Date(date);
	const diffDay = Math.ceil((formatted - new Date()) / 1000 / 60 / 60 / 24);

	function onClick() {
		const code = prompt('참여코드를 입력하세요');
		if (code === list.code) {
			movePageTo(list);
		} else if (code == undefined) {
			return;
		} else {
			alert('참여코드를 잘못 입력했습니다');
			return;
		}
	}

	return (
		<Container>
			<DateSpan diffDay={diffDay} className='list__date'>
				<span className='month'>
					{diffDay <= 4
						? `D - ${diffDay}`
						: `${formatted.getMonth() >= 6 ? '' : '0'}${
								formatted.getMonth() + 1
						  }월
                ${formatted.getDate() >= 10 ? '' : '0'}${formatted.getDate()}일
                `}
				</span>
				<span className='date'>({dateArr[formatted.getDay()]})</span>
			</DateSpan>
			<PlaceSpan className='list__place'>
				<span>{title}</span>
				<span>{place}</span>
			</PlaceSpan>
			<JoinedSpan>
				<span>{howMany}명</span>
			</JoinedSpan>
			<div>
				<Button onClick={() => onClick()} state={state}>
					{state}
				</Button>
			</div>
		</Container>
	);
}

export default List;
