import { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppButton from './components/button';
import AddDialog from './components/dialog-add';
import AppHeader from './components/header';
import Lists from './components/Lists';
import ListPage from './components/list-page';
import { getLists } from './services/database';

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
			console.log(lists);
			return setLists([lists]);
		});
	}, []);
	function handleAdd(item) {
		console.log(item);
		setIsOpen(false);
		presenter.addList(item, setLists);
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
