import { Schedule, ScheduleWithId } from '../types/interfaces/interfaces';
import { Dispatch, SetStateAction } from 'react';
import db from '../services/database';
import { UpdateList, UpdateLists } from '../types/models/models';

const Submit = {
	addSchedule(schedule: Schedule, update: UpdateLists<ScheduleWithId>) {
		if (!schedule.uid) {
			throw new Error('잘못된 접근: 유저정보가 존재하지 않습니다');
		}
		const newList = db.addList(schedule);
		update(prev => [...prev, newList]);
	},

	async getLists(update: UpdateLists<ScheduleWithId>) {
		const lists = await db.getLists();
		update(lists);
	},

	updateState(list: ScheduleWithId, update: UpdateList<boolean>) {
		const updated = { ...list, isAllow: !list.isAllow };
		db.updateList(updated);
		update(!list.isAllow);
	},
};

export default Submit;
