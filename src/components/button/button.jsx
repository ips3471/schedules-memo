import React from 'react';

function AppButton({ name, callback }) {
	return <button onClick={() => callback()}>{name}</button>;
}

export default AppButton;
