import { Schedule } from '../types/interfaces/interfaces';
import db from '../services/database';
import { UpdateList, UpdateLists } from '../types/models/models';

const Submit = {
	addSchedule(schedule: Schedule, uid: string, update: UpdateLists<Schedule>) {
		const newList = db.addList(schedule, uid);
		update(prev => [...prev, newList]);
	},

	async getLists(uid: string, update: UpdateLists<Schedule>) {
		if (uid === process.env.REACT_APP_FIREBASE_ADMIN) {
			console.log('Admin: Get All Schedules');
			db.getAllLists(uid).then(update);
		} else {
			console.log('User: Get User Schedules');
			db.getLists(uid).then(update);
		}
	},

	updateState(list: Schedule, uid: string, update: UpdateList<boolean>) {
		const updated = { ...list, isAllow: !list.isAllow };
		db.updateList(updated, uid);
		update(!list.isAllow);
	},
};

export default Submit;
