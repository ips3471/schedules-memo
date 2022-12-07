import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppButton from './button/button';
import PageComponent from './page-component';
import * as controls from './controls/controls';
import { addAccount } from '../services/database';
import WholeTotal from './wholeTotal';
import PersonToPay from './personToPay';
import PersonToPayBack from './personToPayBack';
import PersonToManage from './personToManage';

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
	.account {
		text-align: right;
		background-color: ${props => props.theme.bgColors.secondary};
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 3rem;
	}
	.account-button {
		height: 100%;
		margin-top: 1rem;
		transform: scale(1.04);
		button {
			width: 100%;
		}
	}
	.account-info {
		height: 100%;

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
	// const { self, mart, ticket, car, reservation } = list.receipts;
	// const receiptsArr = [self, mart, ticket, car, reservation];
	const [account, setAccount] = useState();
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setAccount(list.account);
		setTotal(presenter.getWholeTotal(list));
	}, []);

	function sumPayment(payment) {
		setTotal(prev => prev + Number(payment));
	}

	const handleAccount = () => {
		const bank = prompt('은행명');
		if (!bank) return;
		const account = prompt('계좌번호');
		if (!account) return;
		const person = prompt('예금주');
		if (!bank || !account || !person) {
			return;
		}

		const accountInfo = {
			bank,
			account,
			person,
		};

		addAccount(list.id, accountInfo);
		setAccount(accountInfo);
	};

	const handleFinish = () => {
		console.log('you should implements this function');
	};

	return (
		<Container>
			<h2>💘 {list.title} 정산 페이지입니다!</h2>
			{['food', 'mart', 'ticket', 'car', 'reservation'].map(category => (
				<PageComponent
					sumPayment={sumPayment}
					title={controls.generateTitle(list, category)}
					items={
						list.receipts[category]
							? Object.values(list.receipts[category])
							: []
					}
					presenter={presenter}
					key={['food', 'mart', 'ticket', 'car', 'reservation'].indexOf(
						category,
					)}
					list={list}
					category={category}
				/>
			))}
			<WholeTotal total={total} />

			<div className='personal'>
				<h3>개인별 정산예정 금액:</h3>

				<ul>
					{list.whoAre.map(user => {
						const cost =
							total / list.whoAre.length -
							controls.getUserTotal(list, user.name);

						return (
							<PersonalPayment
								key={user.id}
								value={controls.calculateCost(
									total,
									list,
									presenter.getUserTotal(list, user.name),
								)}
							>
								{user.name === list.host ? '👑' : '🙂'}
								{user.name === list.host && (
									<PersonToManage
										username={user.name}
										total={total}
										cost={cost}
										list={list}
										member={list.whoAre.length}
									/>
								)}
								{user.name !== list.host && cost > 0 && (
									<PersonToPay
										total={total}
										list={list}
										cost={cost}
										member={list.whoAre.length}
										username={user.name}
										host={list.host}
									/>
								)}

								{user.name !== list.host && cost < 0 && (
									<PersonToPayBack
										username={user.name}
										host={list.host}
										toPayBack={cost}
									/>
								)}
								{user.name !== list.host &&
									cost == 0 &&
									controls.toLocalCurrency(
										total,
										list,
										presenter.getUserTotal(list.id, user.name),
									)}
							</PersonalPayment>
						);
					})}
				</ul>
			</div>
			{account && (
				<div className='account account-info'>
					<span>
						{account.bank} {account.account} {account.person}
					</span>
					<AppButton name='정산끝내기' callback={handleFinish} />
				</div>
			)}
			{!account && (
				<div className='account account-button'>
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
