import firebaseApp from '../api/firebase';
import {
	set,
	ref,
	getDatabase,
	get,
	push,
	update,
	child,
} from 'firebase/database';
import { Schedule, ScheduleWithId } from '../types/interfaces/interfaces';
import { v4 as uuid } from 'uuid';
import { User } from '../types/models/models';

const db = {
	database: getDatabase(firebaseApp),

	addList(list: Schedule) {
		const id = uuid();
		const element = { ...list, id };
		set(ref(this.database, `schedules/${id}`), element);
		return element;
	},

	updateList(updated: ScheduleWithId) {
		update(ref(this.database, `schedules/${updated.id}`), updated);
	},

	async getLists(): Promise<ScheduleWithId[]> {
		try {
			const snapshot = await get(ref(this.database, 'schedules'));
			if (snapshot.exists()) {
				return Object.values(snapshot.val());
			} else {
				return [];
			}
		} catch (err) {
			console.error(err);
			return [];
		}
	},

	async isAdmin(user: User | null) {
		return get(ref(this.database, 'admins')) //
			.then(snapshot => {
				if (snapshot.exists()) {
					return snapshot.val().includes(user?.uid);
				} else {
					return false;
				}
			});
	},

	async getUserToken(uid: string) {
		return get(ref(this.database, `Users/${uid}`)) //
			.then(snapshot => {
				if (snapshot.exists()) {
					return snapshot.val().token;
				}
			});
	},

	updateUserToken(uid: string, token: string) {
		update(ref(this.database, `Users/${uid}`), {
			uid,
			token,
		});
	},
};

export default db;
