import React from 'react';
function FormButton({ name, type, callback }) {
	return (
		<button type={type} onClick={() => callback()}>
			{name}
		</button>
	);
}
export default FormButton;
