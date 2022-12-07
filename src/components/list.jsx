import { useState } from 'react';
import styled from 'styled-components';
import DateItem from './list/date';

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

/*
곧 다가오는 일정일 경우 하이라이트
diffDay <= 4 ? 'orange' : ''
 */

function List({ list, movePageTo }) {
	const { title, howMany, place, date, state } = list;

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
		<div className='flex items-center justify-between px-appBody'>
			<DateItem date={date} />

			<span className='flex flex-col'>
				<span>{title}</span>
				<span>{place}</span>
			</span>

			<span>
				<span>{howMany}명</span>
			</span>

			<div>
				<button onClick={() => onClick()} state={state}>
					{state}
				</button>
			</div>
		</div>
	);
}

export default List;
