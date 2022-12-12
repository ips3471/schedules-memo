import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReceiptItem from './receipt-item';
import ReceiptAdd from './receipt-add';
import { addReceipt } from '../services/database';
import CategoryTotal from './categoryTotal';

const Container = styled.div`
	margin-bottom: 0.5em;
	.category-header {
		display: flex;
		justify-content: space-between;
		button {
			background-color: transparent;
			border: none;
			font-size: 1.4em;
			position: relative;
			left: 0;
			bottom: 0.2em;
		}
	}
	.category {
		padding: 0.2em;
		.category-item {
			padding: 0.1em 0;
			display: flex;
			justify-content: space-between;
			.info {
				span {
					padding-right: 1em;
				}
			}
		}
	}
	.total {
		text-align: right;
		padding-bottom: 0.5em;
		font-weight: 700;
	}
	.recipt {
		text-align: right;
	}
	.break {
		text-align: center;
		width: 100%;
		padding: 0.3em;
		.break-item {
			display: inline-block;
			width: 90%;
			height: 1px;
			border-top: 1px solid gray;
		}
	}
`;
const DialogContainer = styled.div`
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 80%;
`;

function PageComponent({
	title,
	items,
	presenter,
	page,
	category,
	sumPayment,
}) {
	const [receipts, setReceipts] = useState(items);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [total, setTotal] = useState(0);

	function updateReceipts(receipt) {
		setReceipts(items => {
			setIsDialogOpen(false);
			let updated = [...items, receipt];
			addReceipt(page.id, category, receipt);
			return updated;
		});
		setTotal(prev => prev + Number(receipt.payment));
		sumPayment(receipt.payment);
	}

	useEffect(() => {
		// const total = presenter.getTotalWithCategory(page, category);
		// console.log('total of ', category, total);
		setTotal(presenter.sumCategory(category, page) || 0);
		sumPayment();
	}, []);

	return (
		<Container className='categories'>
			<div className='category-header'>
				<h3>{title}</h3>
				<button onClick={() => setIsDialogOpen(true)}>✍</button>
			</div>
			<ul className='category'>
				{receipts.length > 0 &&
					receipts.map(item => <ReceiptItem key={item.id} item={item} />)}
			</ul>
			<CategoryTotal total={total} title={title} />
			<div className='break'>
				<span className='break-item'></span>
			</div>
			<DialogContainer>
				{isDialogOpen && (
					<ReceiptAdd
						updateReceipts={updateReceipts}
						title={title}
						setIsDialogOpen={setIsDialogOpen}
						category={category}
						page={page}
					/>
				)}
			</DialogContainer>
		</Container>
	);
}

export default PageComponent;
