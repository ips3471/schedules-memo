import React from 'react';

function AppButton({ name, callback }) {
	return (
		<button className='z-50' onClick={() => callback()}>
			{name}
		</button>
	);
}

export default AppButton;
