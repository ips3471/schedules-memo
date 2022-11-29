import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Header from './header';

const Form = styled.form`
	input {
		width: 100%;
	}
`;
const ButtonContainer = styled.div`
	button {
		width: 50%;
		&.submit {
			background-color: ${props => (props.isComplete ? '' : 'darkgray')};
		}
	}
`;
function AddDialog({ setIsDialogOpen, handleAdd }) {
	const [isComplete, setIsComplete] = useState(false);
	const titleRef = useRef();
	const howManyRef = useRef();
	const dateRef = useRef();
	const placeRef = useRef();
	const codeRef = useRef();
	function observeFormComplete() {
		if (
			titleRef.current.value &&
			howManyRef.current.value &&
			dateRef.current.value &&
			placeRef.current.value &&
			codeRef.current.value
		) {
			console.log('complete');
			!isComplete && setIsComplete(true);
		} else {
			console.log('net complete yet');
			isComplete && setIsComplete(false);
		}
	}
	function onAdd() {
		console.log('onAdd');
		const title = titleRef.current.value;
		const howMany = howManyRef.current.value;
		const date = dateRef.current.value;
		const place = placeRef.current.value;
		const code = codeRef.current.value;
		if (title.length < 3) {
			alert('모임 제목은 세글자 이상이어야 합니다');
			return;
		}
		if (howMany > 20) {
			alert('참여인원은 20명 이하로 입력해야 합니다');
			return;
		}
		const item = {
			id: new Date().toString(),
			title,
			howMany,
			date,
			place,
			code,
			state: '입장',
		};

		isComplete && handleAdd(item);
	}

	return (
		<>
			<Header title='모임추가' />
			<Form>
				<input
					ref={titleRef}
					type='text'
					placeholder='모임 이름'
					onKeyUp={() => observeFormComplete()}
				/>
				<input
					ref={howManyRef}
					type='number'
					placeholder='참여자 수'
					onKeyUp={() => observeFormComplete()}
				/>
				<input
					ref={dateRef}
					type='date'
					name='date'
					min='2022-11-28'
					max='2030-12-31'
					onKeyUp={() => observeFormComplete()}
				/>
				<input
					ref={placeRef}
					type='text'
					maxLength={12}
					placeholder='숙소 이름'
					onKeyUp={() => observeFormComplete()}
				/>
				<input
					ref={codeRef}
					type='text'
					maxLength={12}
					placeholder='참여코드'
					onKeyUp={() => observeFormComplete()}
				/>
			</Form>
			<ButtonContainer isComplete={isComplete}>
				<button
					onClick={() => {
						console.log('모임추가 취소');
						setIsDialogOpen(false);
					}}
				>
					취소
				</button>
				<button
					className='submit'
					type='summit'
					onClick={() => {
						console.log('모임추가 확인');
						onAdd();
					}}
				>
					확인
				</button>
			</ButtonContainer>
		</>
	);
}

export default AddDialog;
