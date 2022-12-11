import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppButton from '../../button/button';
import PageComponent from '../../page-component';
import * as controls from '../../controls/controls';
import { addAccount } from '../../../services/database';
import WholeTotal from '../../wholeTotal';
import List from '../../../presenter/list';
import PersonalPayment from './personal-payment';

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
/* const PersonalPayment = styled.li`
	.won {
		color: ${props => (props.value > 0 ? '' : 'blue')};
	}
	.payback {
		color: blue;
	}
`; */

function ListPage({ list }) {
	const presenter = new List(list);

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

			{Object.keys(list.receipts).map(category => (
				<PageComponent
					sumPayment={sumPayment}
					title={controls.generateTitle(list, category)}
					items={
						list.receipts[category]
							? Object.values(list.receipts[category])
							: []
					}
					presenter={presenter}
					key={Object.keys(list.receipts).indexOf(category)}
					list={list}
					category={category}
				/>
			))}

			<WholeTotal total={total} />

			<div className='personal'>
				<h3>개인별 정산예정 금액:</h3>

				<ul>
					{list.whoAre.map(user => (
						<PersonalPayment
							key={user.id}
							user={user}
							total={total}
							list={list}
						/>
					))}
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
