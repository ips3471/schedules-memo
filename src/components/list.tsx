import DateItem from './body/list/date';
import PlaceItem from './body/list/place';
import { ListProps } from '../types/components/components';
import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import Submit from '../presenter/submit';
import messaging from '../services/messaging';
import FormContainer from './dialog/form/container';

function List({ list, onDelete }: ListProps) {
	const { user } = useAuthContext();
	const { date, from, id, isAllow, mission, reward, to, time, uid } = list;

	const [state, setState] = useState(isAllow);

	const handleList = () => {
		if (isAllow) {
			return alert('이미 수락된 스케줄을 임의로 삭제할 수 없습니다');
		}
		const isRemoving = window.confirm('해당 리스트를 삭제하시겠습니까?');
		if (isRemoving) {
			onDelete(list);
		}
	};

	const handleState = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!user?.isAdmin) {
			alert('권한이 없습니다');
			return;
		}
		Submit.updateState({ ...list, isAllow: state }, uid, setState);
		if (user.uid) {
			messaging.sendMessage('changed', uid);
		}
	};

	return (
		<>
			<li className='flex flex-col px-2'>
				<div className={'flex items-center justify-between px-1 my-1 '}>
					<DateItem date={date} />
					<button
						onClick={handleList}
						className='flex flex-1 items-center justify-between text-left'
					>
						<>
							<PlaceItem from={from} to={to} />
							<span className='text-sm'>{reward.toLocaleString()}원</span>
						</>
					</button>
					<button
						onClick={handleState}
						className={`ml-4 py-3 px-4 border-2 border-zinc-800 text-xs white-space-nowrap ${
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
						<span className='opacity-40'>입력된 요청사항이 없습니다.</span>
					)}
					<span>{time} 출발 예정</span>
				</div>
			</li>
		</>
	);
}

export default List;
