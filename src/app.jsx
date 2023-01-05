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
		toggleDialog();
		if (!schedules) {
			setSchedules([schedule]);
		} else {
			setSchedules(prev => {
				console.log('prev', prev);
				return [...prev, schedule];
			});
		}
	};

	function toggleDialog() {
		setIsAddFormOpen(prev => !prev);
	}

	console.log(schedules);

	return (
		<div className='flex flex-col h-full w-full'>
			<div className='sticky top-0'>
				<AppHeader
					title='🏔 BETA'
					setSelectedList={setSelectedList}
					selectedList={selectedList}
				/>
			</div>

			<div
				className={
					isAddFormOpen
						? 'flex-auto blur-sm pointer-events-none transition-all w-full'
						: 'flex-auto transition-all w-full'
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
						isStretched
					/>
				</div>
			)}

			<div className='fixed top-1/2 -translate-y-1/2 max-w-screen-sm'>
				{isAddFormOpen && (
					<AddScheduleForm
						setIsDialogOpen={setIsAddFormOpen}
						toggleDialog={toggleDialog}
						handleAddSchedule={handleAddSchedule}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
