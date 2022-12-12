import React from 'react';

function ReceiptItem({ item }) {
	const { name, where, payment } = item;

	function handleUploadReceipt() {
		console.log('upload');
	}
	return (
		<li className='category-item'>
			<span className='info'>
				<span className='info__name'>{name}</span>
				<span className='info__shop'>
					{where} <button onClick={handleUploadReceipt}>📜</button>
				</span>
			</span>
			<span className='paid'>{payment}</span>
		</li>
	);
}

export default ReceiptItem;
