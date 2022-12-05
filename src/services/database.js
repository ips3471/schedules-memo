import firebaseApp from '../api/firebase';
import { set, ref, getDatabase, get, child } from 'firebase/database';
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
		payment: parseInt(item.payment),
	}).then(console.log);
}

export async function getLists() {
	return get(ref(database, 'schedules'))
		.then(snapshop => {
			if (snapshop.exists()) {
				return Object.values(snapshop.val());
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
