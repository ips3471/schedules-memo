import { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AppButton from './components/button/button';
import AppHeader from './components/header/app';
import Lists from './components/Lists';
import ListPage from './components/list-page';
import { addList, getLists } from './services/database';
import AddScheduleForm from './components/dialog/add-schedule-form';

const queryClient = new QueryClient();

function App({ presenter }) {
	const [whichPage, setWhichPage] = useState(); //receipts가 init된 상태
	const [lists, setLists] = useState([]);

	useEffect(() => {
		getLists().then(lists => {
			const receiptsContained = lists.map(list => _initReceipts(list));
			return setLists(receiptsContained);
		});

		function _initReceipts(list) {
			if (list.receipts == null) {
				return {
					...list,
					receipts: {
						food: [],
						mart: [],
						car: [],
						ticket: [],
						reservation: [],
					},
				};
			}

			let receipts = { ...list.receipts };

			if (!list.receipts.mart) {
				receipts = { ...receipts, mart: [] };
			}
			if (!list.receipts.car) {
				receipts = { ...receipts, car: [] };
			}
			if (!list.receipts.ticket) {
				receipts = { ...receipts, ticket: [] };
			}
			if (!list.receipts.reservation) {
				receipts = { ...receipts, reservation: [] };
			}
			return { ...list, receipts };
		}
	}, []);

	function handleWhichPage(list) {
		!list && setWhichPage(null);
		setWhichPage(list);
	}

	/* 	function handleAddSchedule(schedule) {
		!schedule && setIsOpen(true);
		setIsOpen(false);
	} */

	return (
		<div className=''>
			<AppHeader
				title='🏔 BETA'
				handleWhichPage={handleWhichPage}
				isPage={!!whichPage}
			/>

			<QueryClientProvider client={queryClient}>
				{/* 
				whichPage가 있다면 lists 목록을,
				whichPage가 없다면 해당 list의 list-page를 보여줌
				*/}
				<div>
					{whichPage && <ListPage list={whichPage} presenter={presenter} />}
					{!whichPage && <Lists handleWhichPage={handleWhichPage} />}
				</div>
			</QueryClientProvider>
		</div>
	);
}

export default App;
