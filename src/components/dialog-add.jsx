import React from 'react';
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
	}
`;
function AddDialog({ setIsDialogOpen }) {
    
	return (
		<>
			<Header title='모임추가' />
			<Form>
				<input type='text' placeholder='모임 이름' />
				<input type='number' max={20} min={1} placeholder='참여자 수' />
				{/* <label htmlFor='date'>모임날짜</label> */}
				<input
					type='date'
					name='date'
					min='2022-11-28'
					max='2030-12-31'
				/>
				<input type='text' maxLength={12} placeholder='숙소 이름' />
				<input type='text' maxLength={12} placeholder='참여코드' />
			</Form>
			<ButtonContainer>
				<button
					onClick={() => {
						console.log('모임추가 취소');
						setIsDialogOpen(false);
					}}
				>
					취소
				</button>
				<button
					onClick={() => {
						console.log('모임추가 확인');
					}}
				>
					확인
				</button>
			</ButtonContainer>
		</>
	);
}

export default AddDialog;
