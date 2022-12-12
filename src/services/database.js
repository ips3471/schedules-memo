import firebaseApp from '../api/firebase';
import { set, ref, getDatabase, get } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const database = getDatabase(firebaseApp);

export async function addList(list) {
	const id = uuid();
	return set(ref(database, `schedules/${id}`), {
		...list,
		id,
	});
}

export async function addReceipt(listId, category, item) {
	const id = uuid();
	set(ref(database, `schedules/${listId}/receipts/${category}/${id}`), {
		...item,
		id,
		payment: parseInt(item.payment),
	}).then(console.log);
}

export async function getLists() {
	return get(ref(database, 'schedules'))
		.then(snapshop => {
			if (snapshop.exists()) {
				const scheduleArr = Object.values(snapshop.val());
				return scheduleArr.map(list => _initReceipts(list));
			}
			return [];
		})
		.catch(console.error);
}

export async function addAccount(listId, accountInfo) {
	set(ref(database, `schedules/${listId}/account`), accountInfo).then(
		console.log,
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
