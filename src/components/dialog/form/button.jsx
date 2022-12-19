import React from 'react';
function FormButton({ name, type, callback = () => {} }) {
	return (
		<button
			className={
				type === 'button'
					? 'flex-1 p-3 bg-slate-900'
					: 'flex-1 p-3 bg-orange-700'
			}
			type={type}
			onClick={() => callback()}
		>
			{name}
		</button>
	);
}
export default FormButton;
