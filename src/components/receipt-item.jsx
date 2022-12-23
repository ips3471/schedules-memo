import React from 'react';

function ReceiptItem({ item, handleUpdatePicture, category }) {
	const { name, where, payment } = item;

	function onPictureAddClick() {
		handleUpdatePicture(category, item);
	}
	return (
		<li className='flex justify-between'>
			<span className=''>
				<span className='mr-4'>{name}</span>
				<span className=''>
					{where} <button onClick={onPictureAddClick}>📜</button>
					{item.url && <span className='text-lime-500'>✔</span>}
				</span>
			</span>
			<span className='paid'>{payment}</span>
		</li>
	);
}

export default ReceiptItem;
