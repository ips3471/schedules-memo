import React from 'react';
import FormHeader from './header';
import FormButton from './button';

function FormContainer({
	onSubmitCallback,
	onCancelCallback,
	formTitle,
	children,
	submitName = '확인',
	cancelName = '취소',
}) {
	const onSubmit = e => {
		e.preventDefault();
		onSubmitCallback();
	};
	return (
		<form onSubmit={onSubmit}>
			<FormHeader title={formTitle} />

			{children}

			<div className='flex justify-between'>
				<FormButton
					name={cancelName}
					type='button'
					callback={() => {
						onCancelCallback();
					}}
				/>
				<FormButton name={submitName} type='submit' />
			</div>
		</form>
	);
}
export default FormContainer;
