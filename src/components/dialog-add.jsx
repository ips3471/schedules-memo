import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Header from './header';

const Form = styled.form`
	input {
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
function AddDialog({ setIsDialogOpen, handleAdd }) {
	const [isComplete, setIsComplete] = useState(false);
	const titleRef = useRef();
	const howManyRef = useRef();
	const dateRef = useRef();
	const placeRef = useRef();
	const codeRef = useRef();
	const joinRef = useRef();
	function observeFormComplete() {
		if (
			titleRef.current.value &&
			howManyRef.current.value &&
			dateRef.current.value &&
			placeRef.current.value &&
			codeRef.current.value &&
			joinRef.current.value
		) {
			!isComplete && setIsComplete(true);
		} else {
			isComplete && setIsComplete(false);
		}
	}
	function onAdd() {
		const title = titleRef.current.value;
		const howMany = howManyRef.current.value;
		const date = dateRef.current.value;
		const place = placeRef.current.value;
		const toBeJoin = joinRef.current.value;
		const code = codeRef.current.value;
		if (title.length < 3) {
			alert('모임 제목은 세글자 이상이어야 합니다');
			return;
		}
		if (howMany > 20) {
			alert('참여인원은 20명 이하로 입력해야 합니다');
			return;
		}

		const splitted = toBeJoin.split(',');
		if (splitted.length != howMany) {
			alert('참여인원의 수와 입력된 참여자의 수가 일치하지 않습니다');
			return;
		}

		const usersArr = [];
		splitted.forEach(name => {
			const trimmed = name.trim();
			usersArr.push({
				name: trimmed,
				id: name + Math.random(),
			});
		});

		const item = {
			id: Date.now().toString(),
			title,
			howMany,
			date,
			place,
			code,
			whoAre: usersArr,
			host: splitted[0],
			state: '입장',
			account: null,
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
					ref={joinRef}
					type='text'
					placeholder='참여자 이름(콤마로 구분, 가장 앞이 모임장)'
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
						setIsDialogOpen(false);
					}}
				>
					취소
				</button>
				<button
					className='submit'
					type='summit'
					onClick={() => {
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
