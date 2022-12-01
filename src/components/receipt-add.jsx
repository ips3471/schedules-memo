import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Header from './header';

const Form = styled.form`
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

	function onAddClick() {
		const name = nameRef.current.value;
		const payment = paymentRef.current.value;
		const where = whereRef.current.value;

		const item = {
			id: Date.now().toString(),
			name,
			where,
			payment,
			category,
		};
		isComplete && updateReceipts(item);
	}

	return (
		<>
			<Header title={title + ' 계산내역 추가'} />
			<Form id='receiptForm'>
				<select ref={nameRef}>
					{list.whoAre.map(user => (
						<option form='receiptForm' key={user.id}>
							{user.name}
						</option>
					))}
				</select>
				<input
					type='text'
					ref={whereRef}
					placeholder='사용처'
					onKeyUp={() => observeFormComplete()}
				/>
				<input
					ref={paymentRef}
					type='number'
					placeholder='사용금액'
					onKeyUp={() => observeFormComplete()}
				/>
			</Form>
			<ButtonContainer isComplete={isComplete}>
				<button
					onClick={() => {
						setIsDialogOpen(false);
					}}
				>
					취소
				</button>
				<button
					type='submit'
					className='submit'
					onClick={() => {
						onAddClick();
					}}
				>
					확인
				</button>
			</ButtonContainer>
		</>
	);
}

export default ReceiptAdd;
