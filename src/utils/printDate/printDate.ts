const current = new Date();
const thisYear = current.getFullYear();
const thisMonth = current.getMonth();

type DateElement = {
	available: boolean;
	date: number;
};
export const PrintDate = {
	current,
	today: current.getDate(),
	lastDayOfMonth: new Date(thisYear, thisMonth, 0).getDate(),
	parseWeek(dateObj: DateElement) {
		console.log(new Date(thisYear, thisMonth, dateObj.date));

		return new Date(thisYear, thisMonth, dateObj.date).getDay();
	},
};
