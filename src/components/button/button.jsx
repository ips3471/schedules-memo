import React from 'react';

function AppButton({ name, callback, isStretched }) {
	return (
		<button className={isStretched ? 'w-full' : ''} onClick={() => callback()}>
			{name}
		</button>
	);
}

export default AppButton;
