import React, { useEffect, useState } from 'react';
import AppButton from '../../button/button';
import PageComponent from '../../page-component';
import * as controls from '../../controls/controls';
import { addAccount } from '../../../services/database';
import WholeTotal from '../../wholeTotal';
import List from '../../../presenter/list';
import PersonalPayment from './personal-payment';

/* payBack의 경우 font-color를 변경해줄 것 */

function ListPage({ page }) {
	const presenter = new List(page);

	const [account, setAccount] = useState();
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setAccount(page.account);
		setTotal(presenter.getWholeTotal(page));
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

		addAccount(page.id, accountInfo);
		setAccount(accountInfo);
	};

	const handleFinish = () => {
		console.log('you should implements this function');
	};

	return (
		<div>
			<h2 className='py-2'>💘 {page.title} 정산 페이지입니다!</h2>

			{Object.keys(page.receipts).map(category => (
				<PageComponent
					sumPayment={sumPayment}
					title={controls.generateTitle(page, category)}
					items={
						page.receipts[category]
							? Object.values(page.receipts[category])
							: []
					}
					presenter={presenter}
					key={Object.keys(page.receipts).indexOf(category)}
					page={page}
					category={category}
				/>
			))}

			<WholeTotal total={total} />

			<div className=''>
				<h3 className='py-1'>개인별 정산예정 금액:</h3>

				<ul>
					{page.whoAre.map(user => (
						<PersonalPayment
							key={user.id}
							user={user}
							total={total}
							page={page}
						/>
					))}
				</ul>
			</div>

			<div className='py-2 flex  justify-between'>
				{account && (
					<>
						<span>
							{account.bank} {account.account} {account.person}
						</span>
						<AppButton name='정산끝내기' callback={handleFinish} />
					</>
				)}
				{!account && (
					<div className='account account-button'>
						<AppButton
							name='이곳을 클릭해서 입금받을 계좌를 입력하세요(방장만!!!👨‍🦰)'
							callback={handleAccount}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default ListPage;
