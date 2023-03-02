import { PrintDate } from './../../utils/printDate/printDate';
import db from '../../services/database';
import { MyDate, UpdateLists } from './../../types/models/models';

const PlannerController = {
	changeAvailable: (date: MyDate, update: UpdateLists<MyDate>) => {
		console.log('to be updated', date);
		const updated = { ...date, available: !date.available };
		db.updateDateAvailable({
			date: updated.date,
			available: updated.available,
		});
		update(prev =>
			prev.map(item => {
				if (item.date === date.date) {
					return updated;
				} else if (item.date + PrintDate.lastDayOfMonth === date.date) {
					return {
						...updated,
						date: updated.date - PrintDate.lastDayOfMonth,
					};
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
	const MAX_LENGTH = 7;
	const { today, lastDayOfMonth, current } = PrintDate;

	return dateArr
		.filter(d => {
			if (lastDayOfMonth - today < MAX_LENGTH) {
				return d.date > today || d.date <= MAX_LENGTH;
			} else {
				return d.date > today && d.date <= today + MAX_LENGTH;
			}
		})
		.map(dateObj => {
			const week = PrintDate.parseWeek(dateObj);

			return {
				...dateObj,
				day:
					week === 0
						? '일'
						: week === 1
						? '월'
						: week === 2
						? '화'
						: week === 3
						? '수'
						: week === 4
						? '목'
						: week === 5
						? '금'
						: '토',
			};
		});
}

export default PlannerController;
