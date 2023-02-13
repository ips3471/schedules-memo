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

function App() {
	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const [schedules, setSchedules] = useState([]);
	const { user } = useAuthContext();
	const [message, setMessage] = useState<PushMessage | null>(null);

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
		user && Submit.getLists(user.uid, setSchedules);
	}, [user]);

	const handleAddSchedule = (form: Schedule) => {
		if (!user) {
			throw new Error('잘못된 접근: User Authentication Error');
		}
		Submit.addSchedule(form, user.uid, setSchedules);
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
		if (!user) {
			alert('로그인 후 이용이 가능합니다');
			return;
		}
		setIsAddFormOpen(prev => !prev);
	}

	return (
		<div className='flex flex-col h-full '>
			<div>
				<Header />
				<ToastContainer delay={5000} position='top-center' />
			</div>
			<Schedules onDelete={handleDeleteSchedule} lists={schedules} />

			{user && (
				<button
					className='w-16 h-16 fixed bottom-5 right-5 rounded-full py-6 bg-orange-700'
					onClick={toggleDialog}
				>
					추가
				</button>
			)}

			<div className='fixed top-1/2 -translate-y-1/2 max-w-screen-sm'>
				{isAddFormOpen && (
					<AddScheduleForm
						toggleDialog={toggleDialog}
						onAddSchedule={handleAddSchedule}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
