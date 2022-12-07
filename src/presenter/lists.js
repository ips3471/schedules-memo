import { addList } from '../services/database';

class ListsPresenter {
	constructor(lists) {
		this.lists = lists;
	}
	load() {
		return this.lists;
	}
	loadList(listId) {
		return this.lists.find(list => list.id === listId);
	}
	getTotalWithCategory(list, category) {
		const receiptsByCategory = list.receipts[category];

		return Object.values(receiptsByCategory).reduce(
			(prev, curr) => prev + Number(curr.payment),
			0,
		);
	}

	getWholeTotal(list) {
		const food = this.getTotalWithCategory(list, 'food') || 0;
		const ticket = this.getTotalWithCategory(list, 'ticket') || 0;
		const mart = this.getTotalWithCategory(list, 'mart') || 0;
		const car = this.getTotalWithCategory(list, 'car') || 0;
		const reservation = this.getTotalWithCategory(list, 'reservation') || 0;

		return ticket + mart + car + reservation + food;
	}
	getUserTotal(list, userName) {
		const categories = list.receipts;
		if (!categories) return;
		const reservation = categories.reservation
			? Object.values(categories.reservation).filter(
					item => item.name === userName,
			  ) //
			: [];
		const mart = categories.mart
			? Object.values(categories.mart).filter(item => item.name === userName) //
			: [];
		const ticket = categories.ticket
			? Object.values(categories.ticket).filter(item => item.name === userName) //
			: [];
		const car = categories.car
			? Object.values(categories.car).filter(item => item.name === userName) //
			: [];
		const food = categories.food
			? Object.values(categories.food).filter(item => item.name === userName) //
			: [];

		return (
			reservation.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			mart.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			ticket.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			car.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			food.reduce((prev, curr) => prev + Number(curr.payment), 0)
		);
	}
	addList(list, update) {
		const { title, howMany, date, place, code, whoAre, host } = list;
		if (!title || !howMany || !date || !place || !code) {
			return;
		}
		const newItem = {
			id: Date.now().toString(),
			title,
			howMany,
			date,
			place,
			code,
			state: '입장',
			receipts: {
				self: [],
				mart: [],
				ticket: [],
				car: [],
				reservation: [],
			},
			whoAre,
			host,
		};
		this.lists.push(newItem);
		update(this.lists);
		addList(list).catch(console.error);
	}
	setAccount(account, listId, update) {
		const index = this.lists.findIndex(item => item.id === listId);
		this.lists[index].account = account;
		update(account);
	}
	remove(list, update) {
		this.lists = this.lists.filter(item => item.id !== list.id);
		update(this.lists);
	}
}

export default ListsPresenter;
