import React, { MouseEvent, useRef } from 'react';
import { RefObject } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import NumberPadButton from './button';

export default function NumberPad({ children, strokePayment }) {
	const inputRef = useRef();

	const handleNumberClick = e => {
		// console.log(children.props.value);
		// console.log(e.currentTarget.value);
		strokePayment(e.currentTarget.value);
	};
	const numberPadRef = useRef();
	const handleEnterClick = e => {};
	const handleDeleteClick = e => {};

	const [numberPad, setNumberPad] = useState(false);

	const toggleNumberPad = () => {
		setNumberPad(prev => !prev);
	};

	return (
		<>
			{children}
			<article
				ref={numberPadRef}
				className='mx-28 fixed top-1/2 w-60  bg-black rounded-md '
			>
				<section className='grid grid-cols-4'>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						1
					</NumberPadButton>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						2
					</NumberPadButton>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						3
					</NumberPadButton>
					<NumberPadButton callback={handleDeleteClick} mode={'backspace'}>
						<div>←</div>
					</NumberPadButton>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						4
					</NumberPadButton>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						5
					</NumberPadButton>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						6
					</NumberPadButton>
					<NumberPadButton callback={handleEnterClick} mode={'enter'}>
						<div className='transform rotate-90 '>⤵</div>
					</NumberPadButton>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						7
					</NumberPadButton>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						8
					</NumberPadButton>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						9
					</NumberPadButton>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						0
					</NumberPadButton>
					<NumberPadButton callback={handleNumberClick} mode={'number'}>
						00
					</NumberPadButton>
				</section>
			</article>
		</>
	);
}
