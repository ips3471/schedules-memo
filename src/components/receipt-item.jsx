import React from 'react';

function ReceiptItem({ item }) {
	const { name, where, payment } = item;

	function handleUploadReceipt() {
		console.log('upload');
	}
	return (
		<li className='flex justify-between'>
			<span className=''>
				<span className='mr-4'>{name}</span>
				<span className='info__shop'>
					{where} <button onClick={handleUploadReceipt}>📜</button>
				</span>
			</span>
			<span className='paid'>{payment}</span>
		</li>
	);
}

export default ReceiptItem;
