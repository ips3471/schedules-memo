class ListsPresenter {
	constructor(lists) {
		this.lists = lists;
	}
	load() {
		return this.lists;
	}
	add(list) {
		this.lists.push(list);
	}
	remove(list) {
		this.lists = this.lists.filter(item => item !== list);
	}
}

export default ListsPresenter;
