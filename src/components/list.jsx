import { useState } from 'react';
import styled from 'styled-components';
import AppButton from './button';
import DateItem from './list/date';
import PlaceItem from './list/place';

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

function List({ list, handleWhichPage }) {
	const { title, howMany, place, date, state, code } = list;

	function onEnterClick() {
		const inserted = prompt('참여코드를 입력하세요');

		if (inserted == null) return;

		if (!_isCodeValid(inserted)) {
			alert('참여코드를 잘못 입력했습니다');
			return;
		}

		handleWhichPage(list);

		function _isCodeValid(inserted) {
			return inserted === code;
		}
	}

	return (
		<div className='flex items-center justify-between px-appBody'>
			<DateItem date={date} />

			<PlaceItem title={title} place={place} />

			<span>{howMany}명</span>

			<AppButton name={state} callback={() => onEnterClick()} />
		</div>
	);
}

export default List;
