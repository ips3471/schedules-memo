import styled from 'styled-components';
import AppButton from './button';

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

function AppHeader({ title, handleWhichPage, isPage }) {
	console.log(isPage);
	return (
		<div className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4 justify-between'>
			<h1 className='font-bold ml-2 text-3xl'>{title}</h1>
			{isPage && (
				<AppButton
					name={'💨'}
					callback={() => {
						handleWhichPage(null);
					}}
				/>
			)}
		</div>
	);
}

export default AppHeader;
