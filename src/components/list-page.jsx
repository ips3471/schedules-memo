import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PageComponent from './page-component';

const Container = styled.div`
	padding-bottom: 1.5rem;
	h2 {
		font-size: 1.1rem;
		padding-bottom: 0.8em;
	}
	.totalSum {
		color: red;
		font-weight: 600;
	}
	.accounts {
		text-align: right;
		background-color: ${props => props.theme.bgColors.secondary};
		display: flex;
		justify-content: space-between;
		margin: 0 -0.5rem 0 -0.5rem;
		padding: 0.5rem 1rem 0.5rem 1rem;
		margin-top: 1rem;
	}
	.personal {
		.personal__payment {
		}
	}
`;
const PersonalPayment = styled.li`
	color: ${props => (props.value > 0 ? '' : 'blue')};
`;

function ListPage({ list, presenter }) {
	const { self, mart, ticket, car, reservation } = list.receipts; //arrays
	const receiptsArr = [self, mart, ticket, car, reservation];

	const users = presenter.loadList(list.id).whoAre;

	function generateTitle(receiptItem) {
		switch (receiptItem) {
			case self:
				return '셀프';
				break;
			case mart:
				return '마트/편의점';
				break;
			case ticket:
				return '티켓/입장료';
				break;
			case car:
				return '주유/주차비';
				break;
			case reservation:
				return '숙소/기타';
				break;
			default:
				throw new Error('item not matched');
		}
	}
	function generateCategory(receiptItem) {
		switch (receiptItem) {
			case self:
				return 'self';
				break;
			case mart:
				return 'mart';
				break;
			case ticket:
				return 'ticket';
				break;
			case car:
				return 'car';
				break;
			case reservation:
				return 'reservation';
				break;
			default:
				throw new Error('item not matched');
		}
	}

	const [total, setTotal] = useState(presenter.getWholeTotal(list.id));

	function sumPayment() {
		setTotal(presenter.getWholeTotal(list.id));
	}

	return (
		<Container>
			<h2>💘 {list.title} 정산 페이지입니다!</h2>
			{receiptsArr.map(receipts => (
				<PageComponent
					sumPayment={sumPayment}
					title={generateTitle(receipts)}
					items={receipts}
					presenter={presenter}
					key={receiptsArr.indexOf(receipts)}
					list={list}
					category={generateCategory(receipts)}
				/>
			))}
			<div className='totalSum'>
				지금까지 소비한 금액: {total.toLocaleString('ko-KR')}
			</div>
			<div className='personal'>
				<h3>개인별 정산예정 금액:</h3>
				<ul>
					{users.map(user => (
						<PersonalPayment
							key={user.id}
							value={
								total / users.length -
								presenter.getUserTotal(list.id, user.name)
							}
						>
							{user.name === list.host ? '👑 ' : '🙂'}
							{user.name}:
							<span className='personal__payment'>
								{(
									total / users.length -
									presenter.getUserTotal(list.id, user.name)
								).toLocaleString('ko-KR', {
									style: 'currency',
									currency: 'KRW',
								})}
							</span>
						</PersonalPayment>
					))}
				</ul>
			</div>

			{/* <div className='accounts'>
				<span>하나은행 000-000000-00000 홍길동</span>
				<button>정산중</button>
			</div> */}
		</Container>
	);
}

export default ListPage;
