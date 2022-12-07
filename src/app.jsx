import { useEffect, useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import AppButton from './components/button';
import AddDialog from './components/dialog-add';
import AppHeader from './components/header';
import Lists from './components/Lists';
import ListPage from './components/list-page';
import { addList, getLists } from './services/database';

/* const AppWrapper = styled.div`
	width: 100%;
`;
const ListContainer = styled.div`
	width: 100%;
	background-color: #ffffff;
	padding: ${props => props.theme.paddingSizes.navbar} 0.5em 0 0.5em;
`;
const DialogContainer = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
	height: 50%;
`;
const ButtonContainer = styled.div`
	width: 100%;
	height: 2rem;
	position: fixed;
	bottom: 0;
	button {
		background-color: ${props =>
			props.whichPage ? 'rgb(255, 38, 38)' : 'rgb(112, 244, 112)'};
		width: 100%;
		height: 100%;
		border-width: 1px;
		border-color: #13a313;
	}
`; */
const queryClient = new QueryClient();

function App({ presenter }) {
	const [whichPage, setWhichPage] = useState(); //receipts가 init된 상태
	const [isOpen, setIsOpen] = useState(false);
	const [lists, setLists] = useState([]);

	useEffect(() => {
		getLists().then(lists => {
			const receiptsContained = lists.map(list => initReceipts(list));
			return setLists(receiptsContained);
		});

		function initReceipts(list) {
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

	function handleAdd(schedule) {
		console.log(schedule);
		setIsOpen(false);
		addList(schedule).then(data => {
			setLists(prev => [...prev, data]);
		});
	}

	function movePageTo(list) {
		setWhichPage(list);
	}

	return (
		<div>
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
					{!whichPage && (
						<Lists handleAdd={handleAdd} handleWhichPage={handleWhichPage} />
					)}
				</div>
			</QueryClientProvider>

			<div whichPage={whichPage}>
				{!whichPage && (
					<AppButton
						name='모임 추가'
						callback={() => {
							if (isOpen) {
								return;
							}
							setIsOpen(true);
						}}
					/>
				)}
			</div>

			{isOpen && (
				<div>
					<AddDialog setIsDialogOpen={setIsOpen} handleAdd={handleAdd} />
				</div>
			)}
		</div>
	);
}

export default App;
