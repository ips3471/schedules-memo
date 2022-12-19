import React from 'react';

function FormReceipt({ handleInputChange, form, page }) {
	function Input(type, placeholder, name) {
		return (
			<input
				type={type}
				placeholder={placeholder}
				onChange={handleInputChange}
				name={name}
				value={form[name]}
				autoComplete='off'
				required
			></input>
		);
	}
	return (
		<div>
			<select onChange={handleInputChange} name='name' value={form['name']}>
				{page.whoAre.map(user => (
					<option form='receiptForm' key={user.id}>
						{user.name}
					</option>
				))}
			</select>

			{new Input('text', '사용처', 'where')}
			{new Input('number', '사용금액', 'payment')}
		</div>
	);
}
export default FormReceipt;
