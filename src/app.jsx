import { useState } from 'react';
import styled from 'styled-components';
import AppButton from './components/button';
import AddDialog from './components/dialog-add';
import AppHeader from './components/header';
import Lists from './components/Lists';
import ListPage from './components/list-page';

const AppWrapper = styled.div`
	width: 100%;
	height: 100%;
`;
const ListContainer = styled.div`
	width: 100%;
	overflow-y: auto;
	border: 1px solid blue;

	background-color: #ffffff;
	padding: 0.5em;
`;
const DialogContainer = styled.div`
	border: 1px solid #000000;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
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
	const [lists, setLists] = useState(presenter.load());

	function handleAdd(item) {
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
				{whichPage ? (
					<AppButton
						name='입금 완료'
						callback={() => {
							console.log('정산완료');
						}}
					/>
				) : (
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
