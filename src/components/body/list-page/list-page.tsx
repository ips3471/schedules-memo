/* import React, { useEffect, useState } from 'react';
import AppButton from '../../button/button';
import PageComponent from '../../page-component';
import * as controls from '../../controls/controls';
import { addAccount, updateList } from '../../../services/database';
import WholeTotal from '../../wholeTotal';
import PersonalPayment from './personal-payment';
import AddReceiptForm from '../../add-receipt-form';
import SubmitPresenter from '../../../presenter/submit';
import PictureViewer from '../../dialog/picture-viewer';

function ListPage({ list, closePage }) {
	const [isDialogOpen, setIsDialogOpen] = useState({
		state: false,
		category: null,
	});
	const [listItem, setListItem] = useState(list);
	const [categoryTotal, setCategoryTotal] = useState({});
	const [total, setTotal] = useState(0);
	const [pictureTarget, setPictureTarget] = useState();

	const handleDisplayForm = (category, item) => {
		if (!category || !item) {
			setPictureTarget(null);
			return;
		}
		setPictureTarget({
			...item,
			listId: list.id,
			category,
			url: item.url ? item.url : null,
		});
	};

	const handleUpdatePicture = item => {
		if (item == null) {
			setPictureTarget(null);
			return;
		}

		const { category, id, url } = item;

		const categoryKey = Object.keys(listItem.receipts[category]).filter(
			key => listItem.receipts[category][key].id === id,
		)[0];

		// return;
		setPictureTarget(item);
		setListItem(list => {
			return {
				...list,
				receipts: {
					...list.receipts,
					[category]: {
						...list.receipts[category],
						[categoryKey]: {
							...list.receipts[category][categoryKey],
							url,
						},
					},
				},
			};
		});
	};

	useEffect(() => {
		let obj = { ...categoryTotal };
		Object.keys(listItem.receipts).map(key => {
			obj[key] = Object.values(listItem.receipts[key]).map(val => {
				return {
					name: val.name,
					payment: val.payment,
				};
			});
		});
		setCategoryTotal(obj);
	}, [listItem]);

	useEffect(() => {
		let container = [];
		Object.values(categoryTotal).forEach(value => {
			for (let child of value) {
				container.push(child.payment);
			}
		});
		setTotal(container.reduce((acc, curr) => acc + curr, 0));
	}, [categoryTotal]);

	const handleAddReceipt = async form => {
		const submitPresenter = new SubmitPresenter(form, listItem);

		const categoryName = isDialogOpen.category;
		const receipt = await submitPresenter.addReceipt(list.id, categoryName);
		const updatedPayment = await submitPresenter.updatePersonalPaid();

		setListItem(prev => {
			return {
				...prev,
				whoAre: updatedPayment,
				receipts: {
					...prev.receipts,
					[categoryName]: {
						...prev.receipts[categoryName],
						[receipt.id]: receipt,
					},
				},
			};
		});
		setIsDialogOpen(prev => {
			return {
				...prev,
				state: false,
			};
		});
		setTotal(prev => prev + Number(receipt.payment));
	};

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
		setListItem(prev => ({ ...prev, account: accountInfo }));
	};

	const handleFinish = () => {
		if (list.state === '완료') {
			alert('이미 정산이 완료된 페이지입니다');
			return;
		}
		const result = window.confirm(
			'참여자 모두 입금을 완료하였나요? 정산을 종료합니다',
		);
		if (!result) return;
		setListItem(prev => {
			const updated = { ...prev, state: '완료' };
			updateList(updated);
			return updated;
		});
		closePage();
	};

	return (
		<>
			<div className={list.state === '완료' ? 'opacity-50' : ''}>
				<div
					className={
						isDialogOpen.state
							? 'px-appBody flex flex-col h-full pointer-events-none'
							: 'px-appBody flex flex-col h-full'
					}
				>
					<h2 className='py-2 font-bold text-xl mb-2'>
						💘 {list.title} 정산 페이지입니다!
					</h2>

					<div className='flex-auto pb-2'>
						{listItem &&
							Object.keys(list.receipts).map(category => (
								<PageComponent
									key={Object.keys(listItem.receipts).indexOf(category)}
									setIsDialogOpen={setIsDialogOpen}
									title={controls.generateTitle(category)}
									receiptsByCategory={Object.values(
										listItem.receipts[category],
									)}
									category={category}
									categoryTotal={categoryTotal}
									handleUpdatePicture={handleDisplayForm}
								/>
							))}

						<WholeTotal text='지금까지 소비한 금액' total={total} />

						<div className=''>
							<h3 className='py-1 font-bold'>개인별 정산예정 금액:</h3>

							<ul>
								{listItem.whoAre.map(user => {
									return (
										<PersonalPayment
											key={user.id}
											user={user}
											host={list.host}
										/>
									);
								})}
							</ul>
						</div>
					</div>
					<div className='w-full py-4 flex justify-between sticky bottom-0 self-end bg-zinc-900'>
						{listItem.account && (
							<div className='w-full flex justify-between'>
								<span className=''>
									{listItem.account.bank} {listItem.account.account}{' '}
									{listItem.account.person}
								</span>
								<AppButton
									name={list.state === '완료' ? '정산완료' : '정산끝내기'}
									callback={handleFinish}
								/>
							</div>
						)}
						{!listItem.account && (
							<div className=''>
								<AppButton
									name='이곳을 클릭해서 입금받을 계좌를 입력하세요 (방장만!!!👨‍🦰)'
									callback={handleAccount}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='max-w-screen-sm max-h-screen w-full fixed top-1/2 -translate-y-1/2'>
				{pictureTarget && (
					<PictureViewer
						updatePictureCallback={handleUpdatePicture}
						target={pictureTarget}
					/>
				)}
				{isDialogOpen.state && (
					<AddReceiptForm
						title={controls.generateTitle(isDialogOpen.category)}
						page={list}
						setIsDialogOpen={setIsDialogOpen}
						handleAddReceipt={handleAddReceipt}
					/>
				)}
			</div>
		</>
	);
}

export default ListPage;
 */
