import { Schedule } from '../types/interfaces/interfaces';
import db from '../services/database';
import { UpdateList, UpdateLists } from '../types/models/models';
import messaging from '../services/messaging';

const Submit = {
	addSchedule(schedule: Schedule, uid: string, update: UpdateLists<Schedule>) {
		const newList = db.addList(schedule, uid);
		update(prev => [...prev, newList]);
	},

	removeSchedule(schedule: Schedule, update: UpdateLists<Schedule>) {
		if (!schedule.id) {
			throw new Error('unknown ID is received');
		}
		db.removeList(schedule.uid, schedule.id);
		update(prev => prev.filter(s => s.id !== schedule.id));
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

	updateSchedule(
		updated: Schedule,
		update: UpdateLists<Schedule>,
		uid?: string,
	) {
		if (!uid) {
			throw new Error('Not found User Authentication');
		}
		db.updateList(updated, uid);
		update(lists => {
			return lists.map(list => {
				if (list.id === updated.id) {
					return updated;
				}
				return list;
			});
		});
		messaging.sendMessage('changed', uid);
	},
};

export default Submit;
