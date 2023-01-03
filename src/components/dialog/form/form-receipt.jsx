import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function FormReceipt({ handleInputChange, handleWhomToPay, form, page }) {
	const [whomToPay, setWhomToPay] = useState(
		page.whoAre.map(who => {
			return {
				name: who.name,
				id: who.id,
				attended: true,
			};
		}),
	);

	function onMemberClick(e) {
		setWhomToPay(whoms => {
			return whoms.map(whom => {
				if (whom.id === e.target.id) {
					return { ...whom, attended: !whom.attended };
				} else {
					return whom;
				}
			});
		});
	}

	useEffect(() => {
		handleWhomToPay(whomToPay);
	}, whomToPay);

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
			<ul className='flex gap-2 bg-white text-gray-900 p-2'>
				{whomToPay.map(whom => (
					<li key={whom.id}>
						<button
							id={whom.id}
							className={
								whom.attended
									? 'border-orange-600 bg-orange-600 text-white p-1 rounded-md border-2'
									: 'p-1 border-2 rounded-md'
							}
							type='button'
							onClick={onMemberClick}
						>
							{whom.name}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
export default FormReceipt;
