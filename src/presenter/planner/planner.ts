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
				} else if (
					item.date +
						new Date(
							new Date().getFullYear(),
							new Date().getMonth() + 1,
							0,
						).getDate() ===
					date.date
				) {
					return {
						...updated,
						date:
							updated.date -
							new Date(
								new Date().getFullYear(),
								new Date().getMonth() + 1,
								0,
							).getDate(),
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
	const current = new Date();
	const today = current.getDate();
	const lastDay = new Date(
		current.getFullYear(),
		current.getMonth() + 1,
		0,
	).getDate();

	return dateArr
		.filter(d => {
			if (lastDay - today <= MAX_LENGTH) {
				console.log('when a tail of the month');
				return (
					(d.date >= today && d.date <= lastDay) ||
					(d.date > lastDay && today - lastDay + MAX_LENGTH >= d.date - lastDay)
				);
			} else {
				console.log('ordinary');
				return (
					today - d.date <= MAX_LENGTH && d.date >= today && d.date <= lastDay
				);
			}
		})
		.map(dateObj => {
			const week = new Date(
				current.getFullYear(),
				current.getMonth() + 1,
				dateObj.date,
			).getDay();

			return {
				...dateObj,
				date: dateObj.date > lastDay ? dateObj.date - lastDay : dateObj.date,
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
