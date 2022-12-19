import React, { useEffect, useState } from 'react';
import ReceiptItem from './receipt-item';
import { addReceipt } from '../services/database';
import CategoryTotal from './categoryTotal';

function PageComponent({
	title,
	category,
	setIsDialogOpen,
	receiptsByCategory,
	categoryTotal,
}) {
	const total = categoryTotal[category]
		? categoryTotal[category].reduce((acc, curr) => acc + curr.payment, 0)
		: 0;

	const onAddClick = () => {
		console.log('clicked add receipt');
		setIsDialogOpen(prev => {
			console.log('isDialogOpen', prev);
			return { ...prev, state: true, category: category };
		});
	};

	return (
		<div className='mb-2'>
			<div className='flex justify-between'>
				<h3 className='font-bold'>{title}</h3>
				<button className='scale-125' onClick={onAddClick}>
					✍
				</button>
			</div>
			<ul className='py-1'>
				{receiptsByCategory &&
					receiptsByCategory.map(item => (
						<ReceiptItem key={item.id} item={item} />
					))}
			</ul>
			<CategoryTotal total={total} title={title} />
			<hr className='my-4' />
		</div>
	);
}

export default PageComponent;
