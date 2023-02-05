function NumberPadButton({ children, mode, callback }) {
	function pickStyle() {
		if (mode === 'enter') return 'row-start-2 row-end-5 col-start-4 col-end-5';
		if (mode === 'backspace')
			return 'row-start-1 row-end-2 col-start-4 col-end-5';
		if (mode === 'number') return 'h-14';
	}

	return (
		<button
			onClick={callback}
			type='button'
			value={children}
			className={pickStyle()}
		>
			{children}
		</button>
	);
}

export default NumberPadButton;
