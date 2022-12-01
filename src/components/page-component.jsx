import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReceiptItem from './receipt-item';
import ReceiptAdd from './receipt-add';

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
	list,
	category,
	sumPayment,
}) {
	const [receipts, setReceipts] = useState(items);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [total, setTotal] = useState(0);
	function updateReceipts(receipt) {
		setReceipts(items => {
			let updated = [...items, receipt];
			setIsDialogOpen(false);
			presenter.addReceipt(receipt, list.id, receipt.category);
			return updated;
		});
	}
	useEffect(() => {
		const total = presenter.getTotalWithCategory(list.id, category);
		setTotal(total);
		sumPayment();
	}, [receipts]);

	return (
		<Container className='categories'>
			<div className='category-header'>
				<h3>{title}</h3>
				<button onClick={() => setIsDialogOpen(true)}>✍</button>
			</div>
			<ul className='category'>
				{receipts.length > 0 &&
					receipts.map(item => (
						<ReceiptItem key={item.id} item={item} />
					))}
			</ul>
			<div className='total'>
				<span>
					{title}에 사용된 금액: {total.toLocaleString('ko-KR')}
				</span>
			</div>
			{/* 			<div className='recipt'>
				<button>영수증</button>
			</div> */}
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
						list={list}
					/>
				)}
			</DialogContainer>
		</Container>
	);
}

export default PageComponent;
