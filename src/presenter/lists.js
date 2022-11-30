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
	getTotalWithCategory(listId, category) {
		const foundList = this.lists.find(item => item.id === listId);
		if (category) {
			return foundList.receipts[category].reduce(
				(prev, curr) => prev + Number(curr.payment),
				0,
			);
		}
	}
	getWholeTotal(listId) {
		return (
			this.getTotalWithCategory(listId, 'self') +
			this.getTotalWithCategory(listId, 'ticket') +
			this.getTotalWithCategory(listId, 'mart') +
			this.getTotalWithCategory(listId, 'car') +
			this.getTotalWithCategory(listId, 'reservation')
		);
	}
	getUserTotal(listId, userName) {
		const foundList = this.lists.find(item => item.id === listId);
		const categories = foundList.receipts;
		const self = categories.self.filter(item => item.name === userName);
		const reservation = categories.reservation.filter(
			item => item.name === userName,
		);
		const mart = categories.mart.filter(item => item.name === userName);
		const ticket = categories.ticket.filter(item => item.name === userName);
		const car = categories.car.filter(item => item.name === userName);
		return (
			self.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			reservation.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			mart.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			ticket.reduce((prev, curr) => prev + Number(curr.payment), 0) +
			car.reduce((prev, curr) => prev + Number(curr.payment), 0)
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
	}
	remove(list, update) {
		this.lists = this.lists.filter(item => item.id !== list.id);
		update(this.lists);
	}
	addReceipt(item, listId, category) {
		let foundReceipts = this.lists.find(item => item.id === listId);
		foundReceipts.receipts[category].push(item);
	}
}

export default ListsPresenter;
