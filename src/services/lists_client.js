import firebaseApp from '../api/firebase';
import { get, getDatabase, ref } from 'firebase/database';
import { v4 as uuid } from 'uuid';

class ListsClient {
	constructor(firebaseApp) {
		this.db = getDatabase(firebaseApp);
	}

	async getLists() {
		return get(ref(this.db, 'schedules'))
			.then(snapshot => {
				if (snapshot.exists()) {
					return Object.values(snapshot.val());
				}
			})
			.catch(console.error);
	}
}

export default ListsClient;
