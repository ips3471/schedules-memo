class DatePresenter {
	constructor(date) {
		this.date = new Date(date);
		this._dateArr = new Array('일', '월', '화', '수', '목', '금', '토');
		this.diffDay = Math.ceil((this.date - new Date()) / 1000 / 60 / 60 / 24);
	}

	getMonth() {
		const month = this.date.getMonth() + 1;

		if (this.diffDay > 0 && this.diffDay <= 4) {
			return 'D - ' + this.diffDay;
		}

		return this._addZero(month) + month + '월';
	}

	getDay() {
		const day = this.date.getDate();

		return this._addZero(day) + day + '일';
	}

	getWeek() {
		return this._dateArr[this.date.getDay()];
	}

	_isUpcoming(diff) {
		return diff > 0 && diff <= 4;
	}

	_addZero(number) {
		if (this._isSingleDigit(number)) return '0';
		return '';
	}

	_isSingleDigit(number) {
		return number <= 10;
	}
}

export default DatePresenter;
