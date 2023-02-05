import React from 'react';

function AppButton({ name, callback }) {
	return (
		<button
			className='w-full h-full py-6 bg-orange-700'
			onClick={() => callback()}
		>
			{name}
		</button>
	);
}

export default AppButton;
