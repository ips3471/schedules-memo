import DateItem from './body/list/date';
import PlaceItem from './body/list/place';
import { ListProps } from '../types/components/components';
import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import Submit from '../presenter/submit';
import messaging from '../services/messaging';

function List({ list }: ListProps) {
	const { user } = useAuthContext();
	const { date, from, id, isAllow, mission, reward, to, time, uid } = list;

	const [state, setState] = useState(isAllow);

	const handleListClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!user?.isAdmin) {
			alert('권한이 없습니다');
			return;
		}
		Submit.updateState({ ...list, isAllow: state }, setState);
		if (uid) {
			messaging.sendMessage('changed', uid);
		}
	};

	return (
		<li className='flex flex-col px-2'>
			<div className={'flex items-center justify-between px-1 my-1 '}>
				<DateItem date={date} />
				<PlaceItem from={from} to={to} />
				<button className='text-sm'>{reward.toLocaleString()}원</button>
				<button
					onClick={handleListClick}
					className={`ml-4 py-3 px-4 border-2 border-zinc-800 text-xs ${
						state ? 'bg-orange-600  font-bold' : ''
					}`}
				>
					수락
					<br />
					{state ? '완료' : '대기'}
				</button>
			</div>
			<div className='border-y-2 py-1 border-zinc-800 px-appBody flex justify-between items-center h-9 text-sm'>
				{mission && <div>{mission}</div>}
				{!mission && (
					<div className='opacity-40'>입력된 요청사항이 없습니다.</div>
				)}
				{time} 출발 예정
			</div>
		</li>
	);
}

export default List;
