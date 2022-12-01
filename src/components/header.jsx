import styled from 'styled-components';

const TitleContainer = styled.div`
	position: fixed;
	width: 100%;
	z-index: 10;
	top: 0;
	display: flex;
	justify-content: space-between;
	padding: ${props => props.theme.paddingSizes.block};
	font-size: ${props => props.theme.fontSizes.heading2};
	background-color: ${props => props.theme.bgColors.secondary};
	height: ${props => props.theme.paddingSizes.navbar};
	button {
		background-color: transparent;
		border: none;
		font-size: 1.8rem;
	}
`;
function AppHeader({ title, whichPage, setWhichPage }) {
	function onExitClick() {
		setWhichPage(null);
	}
	return (
		<TitleContainer>
			<h2>{title}</h2>
			{whichPage && <button onClick={() => onExitClick()}>💨</button>}
		</TitleContainer>
	);
}

export default AppHeader;
