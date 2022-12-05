import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './header';

const Form = styled.form`
	padding-top: ${props => props.theme.paddingSizes.navbar};
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
	const [form, setForm] = useState({
		title: '',
		howMany: '',
		date: '',
		place: '',
		toBeJoin: '',
		code: '',
	});
	function handleChange(e) {
		e.preventDefault();
		observeFormComplete();
		const { name, value } = e.target;
		setForm(prev => {
			return { ...prev, [name]: value };
		});
	}
	function handleSubmit(e) {
		e.preventDefault();
		const { title, howMany, date, place, code, people } = form;
		const splittedPeopleNames = people.split(',');

		if (title.length < 3) {
			alert('모임 제목은 세글자 이상이어야 합니다');
			return;
		}
		if (howMany > 20) {
			alert('참여인원은 20명 이하로 입력해야 합니다');
			return;
		}

		if (splittedPeopleNames.length != howMany) {
			alert('참여인원의 수와 입력된 참여자의 수가 일치하지 않습니다');
			return;
		}

		const whoAre = splittedPeopleNames.map(name => {
			return {
				name: name.trim(),
				id: name + splittedPeopleNames.indexOf(name),
			};
		});

		const item = {
			id: Date.now().toString(),
			title,
			howMany,
			date,
			place,
			code,
			whoAre,
			host: whoAre[0].name,
			state: '입장',
			account: null,
			receipts: {
				self: [],
				mart: [],
				ticket: [],
				car: [],
				reservation: [],
			},
		};

		isComplete && handleAdd(item);
	}

	function observeFormComplete() {
		const { title, howMany, date, place, code, people } = form;
		if (title && howMany && date && place && code && people) {
			!isComplete && setIsComplete(true);
		} else {
			isComplete && setIsComplete(false);
		}
	}

	return (
		<div>
			<Header title='모임추가' />
			<Form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='모임 이름'
					onKeyUp={() => observeFormComplete()}
					onChange={handleChange}
					name='title'
				/>
				<input
					type='number'
					placeholder='참여자 수'
					onKeyUp={() => observeFormComplete()}
					onChange={handleChange}
					name='howMany'
				/>
				<input
					type='text'
					placeholder='참여자 이름(콤마로 구분, 가장 앞이 모임장)'
					onKeyUp={() => observeFormComplete()}
					onChange={handleChange}
					name='people'
				/>
				<input
					type='date'
					name='date'
					min='2022-11-28'
					max='2030-12-31'
					onKeyUp={() => observeFormComplete()}
					onChange={handleChange}
				/>
				<input
					type='text'
					maxLength={12}
					placeholder='숙소 이름'
					onKeyUp={() => observeFormComplete()}
					onChange={handleChange}
					name='place'
				/>
				<input
					type='text'
					maxLength={12}
					placeholder='참여코드'
					onKeyUp={() => observeFormComplete()}
					onChange={handleChange}
					name='code'
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
					<button className='submit' type='submit'>
						확인
					</button>
				</ButtonContainer>
			</Form>
		</div>
	);
}

export default AddDialog;
