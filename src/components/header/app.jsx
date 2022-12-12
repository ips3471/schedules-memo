import AppButton from '../button/button';

function AppHeader({ title, handleDisplayLists, isVisibleExitBtn }) {
	return (
		<div className='w-full flex p-4 text-2xl border-b border-zinc-600 mb-4 justify-between'>
			<h1 className='font-bold ml-2 text-3xl'>{title}</h1>
			{isVisibleExitBtn && (
				<AppButton
					name={'💨'}
					callback={() => {
						handleDisplayLists(true);
					}}
				/>
			)}
		</div>
	);
}

export default AppHeader;
