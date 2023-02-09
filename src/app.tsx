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
		if (!user) {
			return;
		}
		messaging
			.requestPermission() //
			.then(token => {
				token && messaging.addMessageListener(popUpNotification);
				user && token && messaging.updateToken(user, token);
			});
	}, [user]);

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
		Submit.getLists(setSchedules);
	}, []);

	const handleAddSchedule = (form: Schedule) => {
		Submit.addSchedule({ ...form, uid: user?.uid }, setSchedules);
		toggleDialog();
	};

	function toggleDialog() {
		console.log('toggle');
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
				<ToastContainer delay={7000} position='top-center' />
			</div>
			<Schedules lists={schedules} />

			<button
				className='w-16 h-16 fixed bottom-5 right-5 rounded-full py-6 bg-orange-700'
				onClick={toggleDialog}
			>
				추가
			</button>

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
