import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppButton from './components/button';
import AddDialog from './components/dialog-add';
import AppHeader from './components/header';
import Lists from './components/Lists';
import ListPage from './components/list-page';
import { addList, getLists } from './services/database';

const AppWrapper = styled.div`
	width: 100%;
	height: 100%;
`;
const ListContainer = styled.div`
	width: 100%;
	overflow-y: auto;
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
`;

function App({ presenter }) {
	const [whichPage, setWhichPage] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [lists, setLists] = useState([]);

	useEffect(() => {
		getLists().then(lists => {
			const receiptsContained = lists.map(list => initReceipts(list));
			console.log(receiptsContained);
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
		<AppWrapper>
			<AppHeader
				title='🏔BETA'
				whichPage={whichPage}
				setWhichPage={setWhichPage}
			/>

			<ListContainer>
				{whichPage ? (
					<ListPage list={whichPage} presenter={presenter} />
				) : (
					<Lists
						lists={lists}
						movePageTo={movePageTo}
						handleAdd={handleAdd}
					/>
				)}
			</ListContainer>

			<ButtonContainer whichPage={whichPage}>
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
			</ButtonContainer>

			{isOpen && (
				<DialogContainer>
					<AddDialog
						setIsDialogOpen={setIsOpen}
						handleAdd={handleAdd}
					/>
				</DialogContainer>
			)}
		</AppWrapper>
	);
}

export default App;
