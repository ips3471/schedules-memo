import firebaseApp from '../api/firebase';
import { set, ref, getDatabase, get, child } from 'firebase/database';

const database = getDatabase(firebaseApp);

export async function addList(list) {
	console.log(list);
	set(ref(database, 'lists/' + list.id), list).then(console.log);
}

export async function getLists() {
	return get(child(ref(database), 'lists'))
		.then(snapshop => {
			if (snapshop.exists()) {
				return snapshop.val();
			} else {
				return {};
			}
		})
		.catch(console.error);
}
