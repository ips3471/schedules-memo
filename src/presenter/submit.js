import { addList } from '../services/database';

class SubmitPresenter {
	constructor(form) {
		this.form = form;
		this._minTitleLength = 3;
		this._maxMemberSize = 20;
		this.spllitedNames = this.form.people.split(',');
	}

	addSchedule() {
		const schedule = this.getScheduleItem();
		addList(schedule);
	}

	checkValidities() {
		if (!this._checkTitleLength()) return false;

		if (!this._checkMemberSize()) return false;

		if (!this._checkMemberValidity()) return false;

		return true;
	}

	_checkTitleLength() {
		if (this.form.title.length < this._minTitleLength) {
			alert('모임 제목은 세글자 이상이어야 합니다');
			return false;
		}
		return true;
	}

	_checkMemberSize() {
		if (this.form.howMany > this._maxMemberSize) {
			alert('참여인원은 20명 이내로 입력해야 합니다');
			return false;
		}
		return true;
	}

	_checkMemberValidity() {
		if (this.spllitedNames.length !== this.form.howMany) {
			alert('참여인원의 수와 입력된 참여자의 수가 일치하지 않습니다');
			return false;
		}
		return true;
	}

	getScheduleItem() {
		const whoAre = this.spllitedNames.map(name => _getTrimmedObject(name));

		return {
			title: this.form.title,
			howMany: this.form.howMany,
			date: this.form.date,
			place: this.form.place,
			code: this.form.code,
			whoAre,
			host: whoAre[0].name,
			state: '입장',
			account: null,
		};

		function _getTrimmedObject(name) {
			return {
				name: name.trim(),
				id: Date.now().toString(),
			};
		}
	}
}

export default SubmitPresenter;
