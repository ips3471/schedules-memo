import { useEffect, useState } from 'react';
import AppButton from './components/button/button';
import AppHeader from './components/header/app';
import Lists from './components/Lists';
import AddScheduleForm from './components/dialog/add-schedule-form';
import { getLists } from './services/database';
import SubmitPresenter from './presenter/submit';
import ListPage from './components/body/list-page/list-page';

function App() {
	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const [schedules, setSchedules] = useState([]);
	const [selectedList, setSelectedList] = useState(null);

	useEffect(() => {
		getLists().then(setSchedules);
	}, [selectedList]);

	const closePage = () => {
		setSelectedList(null);
	};

	const handleAddSchedule = async form => {
		const submitPresenter = new SubmitPresenter(form);
		if (!submitPresenter.checkValidities()) return;
		const schedule = await submitPresenter.addSchedule();
		console.log('data', schedule);
		setSchedules(prev => [...prev, schedule]);
		toggleDialog();
	};

	function toggleDialog() {
		setIsAddFormOpen(prev => !prev);
	}

	return (
		<div className='flex flex-col h-full'>
			<div>
				<AppHeader
					title='🏔 BETA'
					setSelectedList={setSelectedList}
					selectedList={selectedList}
				/>
			</div>

			<div
				className={
					isAddFormOpen
						? 'flex-auto blur-sm pointer-events-none transition-all'
						: 'flex-auto transition-all'
				}
			>
				{!selectedList && schedules && (
					<Lists schedules={schedules} setSelectedList={setSelectedList} />
				)}
				{selectedList && <ListPage list={selectedList} closePage={closePage} />}
			</div>

			{!selectedList && (
				<div className='w-full text-center sticky bottom-0 self-end py-2 bg-orange-700'>
					<AppButton
						name='모임 추가'
						callback={() => {
							toggleDialog();
						}}
					/>
				</div>
			)}

			{isAddFormOpen && (
				<div className='fixed top-1/2 -translate-y-1/2'>
					<AddScheduleForm
						setIsDialogOpen={setIsAddFormOpen}
						toggleDialog={toggleDialog}
						handleAddSchedule={handleAddSchedule}
					/>
				</div>
			)}
		</div>
	);
}

export default App;
