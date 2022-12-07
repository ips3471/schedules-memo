import React, { useRef, useState } from 'react';
import styled from 'styled-components';
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
	list,
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
			id: Date.now().toString(),
			name: name || list.host,
			where,
			payment,
			category,
		};

		isComplete && updateReceipts(item);
	}

	return (
		<>
			<Header title={title + ' 계산내역 추가'} />
			<Form onSubmit={onAddClick} id='receiptForm'>
				<select onChange={handleChange} name='name' ref={nameRef}>
					{list.whoAre.map(user => (
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
				<ButtonContainer isComplete={isComplete}>
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
				</ButtonContainer>
			</Form>
		</>
	);
}

export default ReceiptAdd;
