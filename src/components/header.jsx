import styled from 'styled-components';

const TitleContainer = styled.h2`
	text-align: center;
	font-size: ${props => props.theme.fontSizes.heading2};
	background-color: ${props => props.theme.bgColors.secondary};
`;
function Header({ title }) {
	return <TitleContainer>{title}</TitleContainer>;
}

export default Header;
