import React from 'react';
function FormButton({ name, type, callback = () => {} }) {
	return (
		<button className='flex-1 p-2' type={type} onClick={() => callback()}>
			{name}
		</button>
	);
}
export default FormButton;
