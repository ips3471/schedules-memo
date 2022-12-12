import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import FormHeader from './dialog/form/header';
import Header from './header/app';

const Form = styled.form`
	padding-top: ${props => props.theme.paddingSizes.navbar};
	input,
	select {
		width: 100%;
		padding: 0.5em;
	}
`;
const ButtonContainer = styled.div`
	button {
		padding: 0.5em;
		width: 50%;
		&.submit {
			background-color: ${props => (props.isComplete ? '' : 'darkgray')};
		}
	}
`;

function ReceiptAdd({
	title,
	updateReceipts,
	setIsDialogOpen,
	category,
	page,
}) {
	const [isComplete, setIsComplete] = useState(false);
	const nameRef = useRef();
	const paymentRef = useRef();
	const whereRef = useRef();
	const [form, setForm] = useState({
		name: '',
		where: '',
		payment: 0,
	});

	function handleChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		setForm(prev => {
			return { ...prev, [name]: value };
		});
	}

	function observeFormComplete() {
		if (
			nameRef.current.value &&
			paymentRef.current.value &&
			whereRef.current.value
		) {
			!isComplete && setIsComplete(true);
		} else {
			isComplete && setIsComplete(false);
		}
	}

	function onAddClick(e) {
		e.preventDefault();
		const { name, payment, where } = form;

		const item = {
			name: name || page.host,
			where,
			payment,
			category,
		};

		isComplete && updateReceipts(item);
	}

	return (
		<>
			<FormHeader title={title + ' 계산내역 추가'} />
			<form onSubmit={onAddClick} id='receiptForm'>
				<select onChange={handleChange} name='name' ref={nameRef}>
					{page.whoAre.map(user => (
						<option form='receiptForm' onChange={handleChange} key={user.id}>
							{user.name}
						</option>
					))}
				</select>
				<input
					type='text'
					ref={whereRef}
					placeholder='사용처'
					onChange={handleChange}
					name='where'
					onKeyUp={() => observeFormComplete()}
				/>
				<input
					ref={paymentRef}
					type='number'
					placeholder='사용금액'
					onChange={handleChange}
					name='payment'
					onKeyUp={() => observeFormComplete()}
				/>
				<div>
					<button
						type='button'
						onClick={() => {
							setIsDialogOpen(false);
						}}
					>
						취소
					</button>
					<button type='submit' className='submit'>
						확인
					</button>
				</div>
			</form>
		</>
	);
}

export default ReceiptAdd;
