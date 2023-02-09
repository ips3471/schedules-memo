import firebaseApp from '../api/firebase';
import { set, ref, getDatabase, get, update, remove } from 'firebase/database';
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

	async removeUserToken(user: User) {
		remove(ref(this.database, `Users/${user.uid}/token`));
	},

	async getUserToken(uid?: string) {
		if (uid == null) {
			throw new Error('user not exist');
		}
		return get(ref(this.database, `Users/${uid}`)) //
			.then(snapshot => {
				if (snapshot.exists()) {
					return snapshot.val().token;
				}
			});
	},

	async getAdmin(): Promise<string> {
		return get(ref(this.database, 'admins')) //
			.then(snapshot => {
				if (snapshot.exists()) {
					return snapshot.val()[0];
				}
			});
	},

	updateUserToken(uid: string, token: string) {
		set(ref(this.database, `Users/${uid}`), {
			uid,
			token,
		});
	},
};

export default db;
