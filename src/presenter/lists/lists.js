// import { getLists } from '../../services/database';

class ListsPresenter {
	constructor(client_DB) {
		this.db = client_DB;
	}

	async fetchLists(setStateAction) {
		const lists = await this.db.getLists();
		const listsMappedCategory = lists.map(this.#initReceipts);
		setStateAction(listsMappedCategory);
	}

	#initReceipts(list) {
		if (list.receipts == null) {
			return {
				...list,
				receipts: {
					food: [],
					mart: [],
					car: [],
					ticket: [],
					reservation: [],
				},
			};
		}

		let receipts = { ...list.receipts };

		if (!list.receipts.mart) {
			receipts = { ...receipts, mart: [] };
		}
		if (!list.receipts.car) {
			receipts = { ...receipts, car: [] };
		}
		if (!list.receipts.ticket) {
			receipts = { ...receipts, ticket: [] };
		}
		if (!list.receipts.reservation) {
			receipts = { ...receipts, reservation: [] };
		}
		return { ...list, receipts };
	}
}

export default ListsPresenter;

/* export async function getListsFromDB() {
	return await getLists();
} */
