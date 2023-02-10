import firebaseApp from '../api/firebase';
import { set, ref, getDatabase, get, update, remove } from 'firebase/database';
import { Schedule } from '../types/interfaces/interfaces';
import { v4 as uuid } from 'uuid';
import { User } from '../types/models/models';

const db = {
	database: getDatabase(firebaseApp),
	admin: process.env.REACT_APP_FIREBASE_ADMIN,

	addList(list: Schedule, uid: string) {
		const id = uuid();
		const element = { ...list, id };
		set(ref(this.database, `schedules/${uid}/${id}`), element);
		return element;
	},

	updateList(updated: Schedule, uid: string) {
		update(ref(this.database, `schedules/${uid}/${updated.id}`), updated);
	},

	async getLists(uid: string): Promise<Schedule[]> {
		try {
			const snapshot = await get(ref(this.database, `schedules/${uid}`));
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

	async getAllLists(uid: string): Promise<Schedule[]> {
		if (uid !== this.admin) {
			throw new Error('Only Accepted to Admin');
		}
		try {
			const snapshot = await get(ref(this.database, 'schedules'));
			if (snapshot.exists()) {
				const ids = Object.values(snapshot.val());
				const childrenReducer = function (prev: Object, current: Object) {
					return Object.values(current).concat(prev);
				};
				const lists = ids.reduce(childrenReducer, []) as Schedule[];
				return lists;
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
