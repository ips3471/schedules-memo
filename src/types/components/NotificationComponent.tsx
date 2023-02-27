import React, { useState } from 'react';
import { BiWalk, BiFlag } from 'react-icons/bi';
import { GiToken } from 'react-icons/gi';
import { MdOutlineAddAlert } from 'react-icons/md';
import { useAuthContext } from '../../context/AuthContext';
import { Schedule } from '../interfaces/interfaces';
import { SendNotificationType } from '../models/models';

interface NotificationComponentProps {
	selected?: Schedule;
	onAccount: () => void;
	onSendMessage: (type: SendNotificationType) => void;
}

export default function NotificationComponent({
	selected,
	onAccount,
	onSendMessage,
}: NotificationComponentProps) {
	const { user } = useAuthContext();

	const [openMessageList, setOpenMessageList] = useState(false);

	return (
		<div className=' flex gap-2 fixed bottom-4 left-4 items-end'>
			{user?.isAdmin && (
				<>
					<div>
						<button
							className='w-16 h-16 text-3xl flex justify-center items-center rounded-full py-6 bg-orange-700'
							onClick={() => {
								const permission = window.confirm(
									`${selected?.displayName}님의 모든 운행완료건을 정산하시겠습니까?`,
								);
								if (permission) {
									onAccount();
									onSendMessage('accounted');
								}
							}}
						>
							<GiToken />
						</button>
					</div>
					<ul className='flex flex-col-reverse relative'>
						<li className=''>
							<button
								className='w-16 h-16 text-3xl flex justify-center items-center rounded-full py-6 bg-orange-700'
								onClick={() => {
									selected && setOpenMessageList(prev => !prev);
								}}
							>
								<MdOutlineAddAlert />
							</button>
						</li>
						<div className='relative bottom-0'>
							<li className='transform mb-1'>
								<button
									onClick={() => onSendMessage('head-out')}
									className={`absolute bottom-0 transition-all w-16 h-16 text-3xl flex justify-center items-center rounded-full py-6 ${
										openMessageList
											? 'translate-y-0 bg-orange-500 '
											: 'invisible translate-y-full bg-orange-700 opacity-0'
									}`}
								>
									<BiWalk />
								</button>
							</li>
							<li className='mb-1'>
								<button
									className={`absolute bottom-0 transition-transform w-16 h-16 text-3xl flex justify-center items-center rounded-full py-6 ${
										openMessageList
											? '-translate-y-full mb-2 bg-orange-500'
											: 'invisible translate-y-full bg-orange-700 opacity-0'
									}`}
									onClick={() => {
										onSendMessage('arrived');
									}}
								>
									<BiFlag />
								</button>
							</li>
						</div>
					</ul>
				</>
			)}
		</div>
	);
}
