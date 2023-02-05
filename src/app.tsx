import { useEffect, useState } from 'react';
import AppButton from './components/button/button';
import Header from './components/header/app';
import Schedules from './components/Lists';
import AddScheduleForm from './components/dialog/add-schedule-form';
import Submit from './presenter/submit';
import { Schedule } from './types/interfaces/interfaces';
import React from 'react';
import { AuthProvider, useAuthContext } from './context/AuthContext';

function App() {
	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const [schedules, setSchedules] = useState([]);
	const { user } = useAuthContext();

	useEffect(() => {
		Submit.getLists(setSchedules);
	}, []);

	const handleAddSchedule = (form: Schedule) => {
		Submit.addSchedule(form, setSchedules);
		toggleDialog();
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
			<Header />
			<Schedules lists={schedules} />

			<button
				className='w-16 h-16 fixed bottom-5 right-5 rounded-full py-6 bg-orange-700'
				onClick={toggleDialog}
			>
				추가
			</button>

			<div className='fixed top-1/2 -translate-y-1/2'>
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