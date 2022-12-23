import firebaseApp from '../api/firebase';
import { set, ref, getDatabase, get, push, update } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const database = getDatabase(firebaseApp);

export async function addList(list) {
	const id = uuid();
	const updated = {
		...list,
		id,
	};
	set(ref(database, `schedules/${id}`), updated);
	const res = await get(ref(database, `schedules/${id}`))
		.then(snapshop => {
			if (snapshop.exists()) {
				return _initReceipts(snapshop.val());
			}
		})
		.catch(console.error);
	return res;
}

export async function updateList(list) {
	update(ref(database, `schedules/${list.id}`), list);
}

export async function addReceipt(listId, category, receipt) {
	const id = uuid();
	const updated = {
		...receipt,
		id,
		payment: parseInt(receipt.payment),
	};
	console.log('updated', updated);
	set(ref(database, `schedules/${listId}/receipts/${category}/${id}`), updated);
	return updated;
}

export async function getLists() {
	return get(ref(database, 'schedules'))
		.then(snapshop => {
			if (snapshop.exists()) {
				const scheduleArr = Object.values(snapshop.val());
				return scheduleArr.map(list => _initReceipts(list));
			}
		})
		.catch(console.error);
}

export async function addAccount(listId, accountInfo) {
	console.log('add accoount');
	set(ref(database, `schedules/${listId}/account`), accountInfo);
}

export async function updateImage(item, url) {
	const { listId, category, id } = item;
	const updated = {
		...item,
		url,
	};
	console.log('updated', updated);
	update(
		ref(database, `schedules/${listId}/receipts/${category}/${id}`),
		updated,
	);
}

function _initReceipts(list) {
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
