class ListsPresenter {
	constructor(lists) {
		this.lists = lists;
	}
	load() {
		return this.lists;
	}
	add(list, update) {
		const { title, howMany, date, place, code } = list;
		if (!title || !howMany || !date || !place || !code) {
			return;
		}
		this.lists.push(list);
		update(this.lists);
	}
	remove(list, update) {
		this.lists = this.lists.filter(item => item.id !== list.id);
		update(this.lists);
	}
}

export default ListsPresenter;
