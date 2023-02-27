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
	const MAX_LENGTH = 6;
	const { today, lastDayOfMonth, current } = PrintDate;

	return dateArr
		.filter(d => {
			if (lastDayOfMonth - today <= MAX_LENGTH) {
				console.log('when a tail of the month');
				return (
					(d.date >= today && d.date <= lastDayOfMonth) ||
					(d.date > lastDayOfMonth &&
						today - lastDayOfMonth + MAX_LENGTH >= d.date - lastDayOfMonth)
				);
			} else {
				console.log('ordinary');
				return (
					today - d.date <= MAX_LENGTH &&
					d.date >= today &&
					d.date <= lastDayOfMonth
				);
			}
		})
		.map(dateObj => {
			const week = PrintDate.parseWeek(dateObj);

			return {
				...dateObj,
				date:
					dateObj.date > lastDayOfMonth
						? dateObj.date - lastDayOfMonth
						: dateObj.date,
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

export default PlannerController;
