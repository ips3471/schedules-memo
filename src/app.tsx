import { useEffect, useState } from 'react';
import Header from './components/header/app';
import Schedules from './components/Lists';
import AddScheduleForm from './components/dialog/add-schedule-form';
import Submit from './presenter/submit';
import { Schedule } from './types/interfaces/interfaces';
import React from 'react';
import { useAuthContext } from './context/AuthContext';
import messaging from './services/messaging';
import { PushMessage } from './types/models/models';
import { ToastContainer, toast } from 'react-toast';
import { MdPlaylistAdd, MdOutlineAddAlert } from 'react-icons/md';
import { BiWalk, BiFlag } from 'react-icons/bi';
import { NavItem } from './types/components/components';
import { GiToken } from 'react-icons/gi';

function App() {
	const [addForm, setAddForm] = useState(false);
	const [selected, setSelected] = useState<Schedule>();
	const [openMessageList, setOpenMessageList] = useState(false);
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const { user } = useAuthContext();
	const [message, setMessage] = useState<PushMessage | null>(null);
	const [nav, setNav] = useState<NavItem>('inProgress');

	useEffect(() => {
		messaging.addMessageListener(popUpNotification);
		if (!user) {
			return;
		}
		console.log('onUser effect');
		messaging
			.requestPermission() //
			.then(token => {
				token && messaging.updateToken(user, token);
			});
	}, []);

	function handleSelect(list: Schedule) {
		setSelected(list);
	}

	function handleUpdateSchedule(item: Schedule) {
		Submit.updateSchedule(item, setSchedules, item.uid);
	}

	function loadLists() {
		console.log('load lists');
		user && Submit.getLists(user.uid, setSchedules);
	}

	function popUpNotification(title: string, body: string) {
		console.log(title, body);
		setTimeout(() => {
			setMessage(null);
		}, 5000);
		setMessage(prev => ({ title, body }));
	}

	useEffect(() => {
		if (message == null) {
			return;
		}
		toast(message.body);
	}, [message]);

	useEffect(() => {
		loadLists();
	}, [user]);

	const handleAddSchedule = (form: Schedule) => {
		if (!user) {
			throw new Error('잘못된 접근: User Authentication Error');
		}
		Submit.addSchedule(form, user, setSchedules);
		messaging.sendMessage(
			'submitted',
			process.env.REACT_APP_FIREBASE_ADMIN! as string,
		);

		toggleDialog();
	};

	const handleDeleteSchedule = (schedule: Schedule) => {
		Submit.removeSchedule(schedule, setSchedules);
		messaging.sendMessage(
			'changed',
			process.env.REACT_APP_FIREBASE_ADMIN! as string,
		);
	};

	function toggleDialog() {
		setAddForm(prev => !prev);
	}

	return (
		<div
			onClick={() => {
				openMessageList && setOpenMessageList(false);
			}}
			className='flex flex-col h-full z-0'
		>
			<Header onRefresh={loadLists} />

			<nav className='border-b border-zinc-600 mb-4 '>
				<ul className='flex justify-between  text-center '>
					<li
						onClick={() => setNav('inProgress')}
						className={`flex-1 py-5  border-r border-zinc-600 ${
							nav === 'inProgress' && 'bg-orange-600 text-slate-100 font-medium'
						}`}
					>
						진행중
					</li>
					<li
						onClick={() => setNav('isFinished')}
						className={`flex-1 py-5  ${
							nav === 'isFinished' && 'bg-orange-600 text-slate-100 font-medium'
						}`}
					>
						지난 여정
					</li>
				</ul>
			</nav>
			<ToastContainer position='top-center' />

			<Schedules
				selected={selected}
				onSelect={handleSelect}
				onUpdate={handleUpdateSchedule}
				onDelete={handleDeleteSchedule}
			>
				{nav === 'isFinished'
					? schedules.filter(s => s.state === 'paid')
					: schedules.filter(s => s.state !== 'paid')}
			</Schedules>

			{user && (
				<div className='flex items-end gap-5 fixed bottom-5 right-5'>
					{user.isAdmin && (
						<div>
							<button
								className='w-16 h-16 text-3xl flex justify-center items-center rounded-full py-6 bg-orange-700'
								onClick={() => {
									const permission = window.confirm(
										`${selected?.uid}님의 정산을 진행하시겠습니까?`,
									);
									permission && Submit.account(user.uid, setSchedules);
								}}
							>
								<GiToken />
							</button>
						</div>
					)}
					{user.isAdmin && (
						<ul className='flex flex-col-reverse gap-2 relative'>
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
							<>
								<li className='transform '>
									<button
										onClick={() => {
											messaging.sendMessage('head-out', selected?.uid);
										}}
										className={`transition-all w-16 h-16 text-3xl flex justify-center items-center rounded-full py-6 ${
											openMessageList
												? 'translate-y-0 bg-orange-500 '
												: 'invisible translate-y-full bg-orange-700 opacity-0'
										}`}
									>
										<BiWalk />
									</button>
								</li>
								<li>
									<button
										className={`transition-transform w-16 h-16 text-3xl flex justify-center items-center rounded-full py-6 ${
											openMessageList
												? 'translate-y-0 bg-orange-500'
												: 'invisible translate-y-full bg-orange-700 opacity-0'
										}`}
										onClick={() => {
											messaging.sendMessage('arrived', selected?.uid);
										}}
									>
										<BiFlag />
									</button>
								</li>
							</>
						</ul>
					)}
					<div>
						<button
							className='w-16 h-16 text-3xl flex justify-center items-center rounded-full py-6 bg-orange-700'
							onClick={() => setAddForm(prev => !prev)}
						>
							<MdPlaylistAdd />
						</button>
					</div>
				</div>
			)}

			<ul className='fixed top-1/2 -translate-y-1/2 max-w-screen-sm'>
				{addForm && (
					<AddScheduleForm
						toggleDialog={() => setAddForm(prev => !prev)}
						onAddSchedule={handleAddSchedule}
					/>
				)}
			</ul>
		</div>
	);
}

export default App;
