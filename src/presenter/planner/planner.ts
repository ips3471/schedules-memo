import db from '../../services/database';
import { MyDate, UpdateLists } from './../../types/models/models';
const presenter = {
	changeAvailable: (date: MyDate, update: UpdateLists<MyDate>) => {
		const updated = { ...date, available: !date.available };
		db.updateDateAvailable({
			date: updated.date,
			available: updated.available,
		});
		update(prev =>
			prev.map(item => {
				if (item.date === date.date) {
					return updated;
				} else {
					return item;
				}
			}),
		);
	},

	getPlans: async () => {
		return db.getPlans().then(filterDateOfThisMonth);
	},
};

function filterDateOfThisMonth(
	dateArr: {
		date: number;
		available: boolean;
	}[],
): MyDate[] {
	const current = new Date();
	const today = current.getDate();
	const lastDay = new Date(
		current.getFullYear(),
		current.getMonth() + 1,
		0,
	).getDate();
	return dateArr
		.filter(d => d.date >= today && d.date <= lastDay)
		.map(dateObj => {
			const week = new Date(
				current.getFullYear(),
				current.getMonth() + 1,
				dateObj.date,
			).getDay();
			return {
				...dateObj,
				day:
					week === 0
						? '월'
						: week === 1
						? '화'
						: week === 2
						? '수'
						: week === 3
						? '목'
						: week === 4
						? '금'
						: week === 5
						? '토'
						: '일',
			};
		});
}

export default presenter;
