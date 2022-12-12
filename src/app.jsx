import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AppButton from './components/button/button';
import AppHeader from './components/header/app';
import Lists from './components/Lists';
import AddScheduleForm from './components/dialog/add-schedule-form';

const queryClient = new QueryClient();

function App() {
	const [isAddFormOpen, setIsAddFormOpen] = useState(false);
	const [isVisibleAddScheduleBtn, setIsVisibleAddScheduleBtn] = useState(true);
	const [isVisibleExitBtn, setIsVisibleExitBtn] = useState(false);
	const [isPageCollapsed, setIsPageCollapsed] = useState(true);

	function handleDisplayLists(isDisplayLists) {
		setIsVisibleExitBtn(!isDisplayLists);
		setIsVisibleAddScheduleBtn(isDisplayLists);
		setIsPageCollapsed(isDisplayLists);
	}

	function popUpDialog() {
		setIsAddFormOpen(!isAddFormOpen);
	}

	return (
		<div className='flex flex-col h-full'>
			<div>
				<AppHeader
					title='🏔 BETA'
					handleDisplayLists={handleDisplayLists}
					isVisibleExitBtn={isVisibleExitBtn}
				/>
			</div>

			<QueryClientProvider client={queryClient}>
				<div className='flex-auto'>
					<Lists
						handleDisplayLists={handleDisplayLists}
						isPageCollapsed={isPageCollapsed}
					/>
				</div>
			</QueryClientProvider>

			{isVisibleAddScheduleBtn && (
				<div className='w-full text-center sticky bottom-0 self-end py-2'>
					<AppButton
						name='모임 추가'
						callback={() => {
							setIsAddFormOpen(true);
						}}
					/>
				</div>
			)}

			{isAddFormOpen && (
				<div className='fixed top-1/2 -translate-y-1/2'>
					<AddScheduleForm
						setIsDialogOpen={setIsAddFormOpen}
						popUpDialog={popUpDialog}
					/>
				</div>
			)}
		</div>
	);
}

export default App;
