import React from 'react';
import FormHeader from './header';
import FormButton from './button';

function FormContainer({
	onSubmitCallback,
	onCancelCallback,
	formTitle,
	children,
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
					name='취소'
					type='button'
					callback={() => {
						onCancelCallback();
					}}
				/>
				<FormButton name='확인' type='submit' />
			</div>
		</form>
	);
}
export default FormContainer;
