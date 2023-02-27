import { useEffect, useState } from 'react';
import Header from './components/header/app';
import Schedules from './components/Lists';
import AddScheduleForm from './components/dialog/add-schedule-form';
import Submit from './presenter/submit';
import { Schedule } from './types/interfaces/interfaces';
import React from 'react';
import { useAuthContext } from './context/AuthContext';
import messaging from './services/messaging';
import {
	MyDate,
	PushMessage,
	SendNotificationType,
} from './types/models/models';
import { ToastContainer, toast } from 'react-toast';
import { MdPlaylistAdd } from 'react-icons/md';
import { NavItem } from './types/components/components';
import PlannerComponent from './components/planner/planner';
import PlannerController from './presenter/planner/planner';
import NotificationComponent from './types/components/NotificationComponent';

function App() {
	const [planner, setPlanner] = useState<MyDate[]>([]);
	const [addForm, setAddForm] = useState(false);
	const [selected, setSelected] = useState<Schedule>();
	const [schedules, setSchedules] = useState<Schedule[]>([]);
	const { user } = useAuthContext();
	const [message, setMessage] = useState<PushMessage | null>(null);
	const [nav, setNav] = useState<NavItem>('inProgress');

	useEffect(() => {
		PlannerController.getPlans().then(setPlanner);
	}, []);

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

	function handleAccount() {
		Submit.account(selected?.uid, setSchedules);
	}

	const handlePlanChanged = (dateObj: MyDate) => {
		if (user?.isAdmin) {
			if (dateObj.date > new Date().getDate()) {
				console.log('plan update', dateObj, dateObj.available);
				PlannerController.changeAvailable(dateObj, setPlanner);
			} else {
				console.log('passed fixed date');
				handlePlanChanged({
					...dateObj,
					date:
						dateObj.date +
						new Date(
							new Date().getFullYear(),
							new Date().getMonth() + 1,
							0,
						).getDate(),
				});
			}
		}
	};

	function handleUpdateSchedule(item: Schedule) {
		Submit.updateSchedule(item, setSchedules, item.uid, popUpNotification);
	}

	function loadLists() {
		console.log('load lists');
		user && Submit.getLists(user.uid, setSchedules);
		PlannerController.getPlans().then(setPlanner);
	}

	function popUpNotification(title: string, body: string) {
		setMessage(prev => ({ title, body }));
	}

	function handleSendMessage(type: SendNotificationType) {
		messaging.sendMessage(type, selected?.uid, popUpNotification);
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
			popUpNotification,
		);

		toggleDialog();
	};

	const handleDeleteSchedule = (schedule: Schedule) => {
		Submit.removeSchedule(schedule, setSchedules);
		messaging.sendMessage(
			'changed',
			process.env.REACT_APP_FIREBASE_ADMIN! as string,
			popUpNotification,
		);
	};

	function toggleDialog() {
		setAddForm(prev => !prev);
	}

	return (
		<div className='flex flex-col h-full z-0'>
			<Header onRefresh={loadLists} />

			<div className='border-b border-zinc-600 mb-2 '>
				<ul className='overflow-x-scroll scrollbar-hide whitespace-nowrap gap-2 my-2 mx-1'>
					{planner.map(dateObj => (
						<PlannerComponent
							onDateChanged={handlePlanChanged}
							date={dateObj}
							key={dateObj.date}
						/>
					))}
				</ul>
				<ul className='flex justify-between  text-center '>
					<li
						onClick={() => setNav('inProgress')}
						className={`flex-1 py-3  border-r border-zinc-600 ${
							nav === 'inProgress' && 'bg-orange-600 text-slate-100 font-medium'
						}`}
					>
						진행중
					</li>
					<li
						onClick={() => setNav('isFinished')}
						className={`flex-1 py-3  ${
							nav === 'isFinished' && 'bg-orange-600 text-slate-100 font-medium'
						}`}
					>
						지난 여정
					</li>
				</ul>
			</div>
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

			<div>
				{user && (
					<div className='flex items-end justify-end gap-2 p-4'>
						<NotificationComponent
							onSendMessage={handleSendMessage}
							onAccount={handleAccount}
							selected={selected}
						/>
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
			</div>

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
