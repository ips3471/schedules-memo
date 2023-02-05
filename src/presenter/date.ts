class DatePresenter {
	date: Date;
	private _dateArr: string[];
	diffDay: number;
	constructor(date: string) {
		this.date = new Date(date);
		this._dateArr = ['일', '월', '화', '수', '목', '금', '토'];
		this.diffDay = Math.ceil(
			(Number(this.date) - Number(new Date())) / 1000 / 60 / 60 / 24,
		);
	}

	getDate() {
		if (this.diffDay >= 0 && this.diffDay <= 3) {
			return 'D - ' + Math.abs(this.diffDay);
		}
		if (this.diffDay > -3 && this.diffDay < 0) {
			return 'D + ' + Math.abs(this.diffDay);
		}

		return this.getMonth() + ' ' + this.getDay();
	}

	getMonth() {
		const month = this.date.getMonth() + 1;

		return this.addZero(month) + month + '월';
	}

	getDay() {
		const day = this.date.getDate();

		return this.addZero(day) + day + '일';
	}

	getWeek() {
		return this._dateArr[this.date.getDay()];
	}

	_isUpcoming(diff: number) {
		return diff > 0 && diff <= 4;
	}

	private addZero(number: number) {
		if (this._isSingleDigit(number)) return '0';
		return '';
	}

	_isSingleDigit(number: number) {
		return number <= 10;
	}
}

export default DatePresenter;
