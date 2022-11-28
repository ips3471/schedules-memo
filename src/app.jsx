import { useState } from 'react';
import styled from 'styled-components';
import AddDialog from './components/dialog-add';
import Lists from './components/Lists';

const AppWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
`;

const Header = styled.header`
	background-color: #999999;
	width: 100%;
	height: 2rem;
`;
const ListContainer = styled.div`
	width: 100%;
	flex: 1;
	background-color: #ffffff;
`;
const ButtonContainer = styled.div`
	width: 100%;
	height: 2rem;
	background-color: #999999;
	button {
		width: 100%;
		height: 100%;
	}
`;
const DialogContainer = styled.div`
	border: 1px solid #000000;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 15rem;
	/* height: 9rem; */
`;

function App({ presenter }) {
	const [isOpen, setIsOpen] = useState(false);
	const [lists, setLists] = useState(presenter.load());
	return (
		<AppWrapper>
			<Header>위-어카운트</Header>
			<ListContainer>
				<Lists lists={lists} />
			</ListContainer>
			<ButtonContainer>
				<button
					onClick={() => {
						if (isOpen) {
							return;
						}
						setIsOpen(true);
					}}
				>
					모임추가
				</button>
			</ButtonContainer>
			{isOpen && (
				<DialogContainer>
					<AddDialog setIsDialogOpen={setIsOpen} />
				</DialogContainer>
			)}
		</AppWrapper>
	);
}

export default App;
