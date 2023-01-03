import React, { useState } from 'react';
import FormContainer from './dialog/form/container';
import FormReceipt from './dialog/form/form-receipt';

function AddReceiptForm({ handleAddReceipt, page, setIsDialogOpen, title }) {
	const _defaultForm = {
		name: page.host,
		where: '',
		payment: 0,
		whomToPay: [],
	};

	const [form, setForm] = useState(_defaultForm);

	function handleWhomToPay(whomToPay) {
		const filtered = whomToPay.filter(whom => whom.attended);
		const mapped = filtered.map(whom => whom.id);
		setForm(form => ({ ...form, whomToPay: mapped }));
	}

	function handleInputChange(e) {
		e.preventDefault();

		const { name, value } = e.target;
		setForm(prev => {
			return { ...prev, [name]: value };
		});
	}

	return (
		<>
			<FormContainer
				formTitle={title + ' 지출내역 추가'}
				onCancelCallback={() =>
					setIsDialogOpen({ state: false, category: null })
				}
				onSubmitCallback={() => handleAddReceipt(form)}
			>
				<FormReceipt
					page={page}
					form={form}
					handleInputChange={handleInputChange}
					handleWhomToPay={handleWhomToPay}
				/>
			</FormContainer>
		</>
	);
}

export default AddReceiptForm;
