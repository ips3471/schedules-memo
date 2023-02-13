import DateItem from './body/list/date';
import PlaceItem from './body/list/place';
import { ListProps } from '../types/components/components';
import React, { ReactNode, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { State } from '../types/interfaces/interfaces';
import { MdOutlinePending } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { GrScheduleNew } from 'react-icons/gr';

function List({ list, onDelete, onUpdate, onSelect, selected }: ListProps) {
	const { user } = useAuthContext();
	const { date, from, id, state, mission, reward, to, time, uid } = list;

	const [selectedState, setSelectedState] = useState<State | null>(state);

	const handleList = () => {
		if (state === 'finished') {
			return alert('완료된 운행건을 임의로 삭제할 수 없습니다');
		}
		if (state === 'canceled') {
			return alert('이미 취소를 요청한 운행건입니다');
		}
		const isRemoving = window.confirm('해당 리스트를 삭제하시겠습니까?');
		if (isRemoving) {
			onDelete(list);
		}
	};

	const handleUpdateState = (state: State) => {
		const confirm = window.confirm(
			`Are you sure to change the state to ${state}?`,
		);
		if (!confirm) return;

		onUpdate({ ...list, state });
		setSelectedState(state);
	};
	function genStateButton(children: string) {
		return (
			<button
				onClick={() => {
					user?.isAdmin && selectedState
						? setSelectedState(null)
						: setSelectedState(state);
				}}
				className={`ml-4 py-3 px-4 border-2 border-zinc-800 text-xs white-space-nowrap ${
					state === 'confirmed' || state === 'paid' || state === 'finished'
						? 'bg-orange-600  font-bold'
						: ''
				}`}
			>
				{children.slice(0, 2)} <br /> {children.slice(2, 4)}
			</button>
		);
	}

	return (
		<li
			className={`${
				(state === 'finished' || state === 'paid') &&
				'opacity-40 pointer-events-none'
			} flex flex-col px-2`}
		>
			<div className={'flex items-center justify-between px-1 my-1 '}>
				<DateItem
					list={list}
					onSelect={onSelect}
					date={date}
					selected={selected}
				/>
				<button
					onClick={handleList}
					className='flex flex-1 items-center justify-between text-left'
				>
					<>
						<PlaceItem from={from} to={to} />
						<span className='text-sm'>{reward.toLocaleString()}원</span>
					</>
				</button>
				<div className='relative'>
					{state === 'canceled' && genStateButton('취소요청')}
					{state === 'confirmed' && genStateButton('예약완료')}
					{state === 'finished' && genStateButton('운행완료')}
					{state === 'paid' && genStateButton('정산완료')}
					{state === 'pending' && genStateButton('예약대기')}
					{selectedState === null && (
						<ul className='absolute top-0 -left-14 flex flex-col gap-1'>
							<li className=''>
								<button
									onClick={() => handleUpdateState('pending')}
									className='p-3 flex justify-center items-center text-gray-200  bg-orange-700 rounded-full opacity-90 text-3xl border-zinc-400 border w-16 h-16  '
								>
									<MdOutlinePending />
								</button>
							</li>
							<li className=''>
								<button
									onClick={() => handleUpdateState('confirmed')}
									className='p-3 flex justify-center items-center text-gray-200  bg-orange-700 rounded-full opacity-90 text-3xl border-zinc-400 border w-16 h-16 '
								>
									<GiConfirmed />
								</button>
							</li>
							<li className=''>
								<button
									onClick={() => handleUpdateState('finished')}
									className='p-3 flex justify-center items-center text-gray-200  bg-orange-700 rounded-full opacity-90 text-3xl border-zinc-400 border w-16 h-16 '
								>
									<GrScheduleNew />
								</button>
							</li>
						</ul>
					)}
				</div>
			</div>
			<div className='border-y-2 py-1 border-zinc-800 px-appBody flex justify-between items-center h-9 text-sm'>
				{mission && <div>{mission}</div>}
				{!mission && (
					<span className='opacity-40'>입력된 요청사항이 없습니다.</span>
				)}
				{(state === 'pending' || state === 'confirmed') && (
					<span>{time} 출발 예정</span>
				)}
				{state === 'canceled' && <span>취소 에정</span>}
				{state === 'finished' && <span>운행 완료</span>}
				{state === 'paid' && <span>정산 완료</span>}
			</div>
		</li>
	);
}

export default List;
