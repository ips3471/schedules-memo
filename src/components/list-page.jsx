import React, { useState } from 'react';
import styled from 'styled-components';
import AppButton from './button';
import PageComponent from './page-component';

const Container = styled.div`
	padding-top: ${props => props.theme.paddingSizes.block};
	h2 {
		font-size: 1.1rem;
		padding-bottom: 0.8em;
	}
	.totalSum {
		color: red;
		font-weight: 600;
	}
	.account-button {
		text-align: right;
		background-color: ${props => props.theme.bgColors.secondary};
		display: flex;
		justify-content: space-between;
		height: 3rem;
		margin-top: 1rem;
		transform: scale(1.04);
		button {
			width: 100%;
		}
	}
	.account-info {
		text-align: right;
		background-color: ${props => props.theme.bgColors.secondary};
		display: flex;
		justify-content: space-between;
		height: 2rem;
		line-height: 2rem;
		margin-top: 1rem;
		transform: scale(1.04);
	}
`;
const PersonalPayment = styled.li`
	.won {
		color: ${props => (props.value > 0 ? '' : 'blue')};
	}
	.payback {
		color: blue;
	}
`;

function ListPage({ list, presenter }) {
	const { self, mart, ticket, car, reservation } = list.receipts;
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

	const handleAccount = () => {
		const bank = prompt('은행명');
		const account = prompt('계좌번호');
		const person = prompt('예금주');
		if (!bank || !account || !person) {
			return;
		}
		const accountInfo = {
			bank,
			account,
			person,
		};
		presenter.setAccount(accountInfo, list.id);
	};

	const handleFinish = () => {
		console.log('dd');
	};

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
					{users.map(user => {
						const cost =
							total / users.length -
							presenter.getUserTotal(list.id, user.name);
						const trimmedCost = cost.toLocaleString('ko-KR', {
							style: 'currency',
							currency: 'KRW',
						});
						const negativeCost = (cost * -1).toLocaleString(
							'ko-KR',
							{
								style: 'currency',
								currency: 'KRW',
							},
						);

						return (
							<PersonalPayment key={user.id} value={cost}>
								{user.name === list.host ? '👑' : '🙂'}
								{user.name === list.host &&
									`${user.name} 개인 지출: ${negativeCost}`}
								{user.name !== list.host &&
									cost > 0 &&
									`${user.name}님은 👑${list.host}에게 ${trimmedCost} 입금`}
								{user.name !== list.host && cost < 0 && (
									<span className='payback'>
										{user.name}님은 👑{list.host}에게{' '}
										{negativeCost} 받음
									</span>
								)}
								{user.name !== list.host &&
									cost == 0 &&
									trimmedCost}
							</PersonalPayment>
						);
					})}
				</ul>
			</div>
			{list.account && (
				<div className='account-info'>
					<span>
						{list.account.bank} {list.account.account}{' '}
						{list.account.person}
					</span>
					<AppButton name='정산끝내기' callback={handleFinish} />
				</div>
			)}
			{!list.account && (
				<div className='account-button'>
					<AppButton
						name='이곳을 클릭해서 입금받을 계좌를 입력하세요(방장만!!!👨‍🦰)'
						callback={handleAccount}
					/>
				</div>
			)}
		</Container>
	);
}

export default ListPage;
