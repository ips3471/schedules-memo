import React, { MouseEvent } from 'react';
import { MyDate } from '../../types/models/models';

interface PlannerProps {
	date: MyDate;
	onDateChanged: (date: MyDate) => void;
}

export default function Planner({ date, onDateChanged }: PlannerProps) {
	return (
		<li onClick={() => onDateChanged(date)} className='inline-block mr-1'>
			<div
				className={` flex flex-col items-center justify-center  p-2 rounded-full w-14 h-14  ${
					date.available
						? 'bg-lime-500 text-blue-900'
						: 'bg-rose-500 font-light'
				}`}
			>
				<span className='text-xl'>{date.date}</span>
				<span className='text-sm'>{date.day}</span>
			</div>
		</li>
	);
}

{
}
