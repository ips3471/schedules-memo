import { addList } from '../services/database';

class SubmitPresenter {
	constructor(form) {
		this.form = form;
		this._minTitleLength = 3;
		this._maxMemberSize = 20;
		this.spllitedNames = this.form.people.split(',');
	}

	async addSchedule() {
		const schedule = this.getScheduleItem();
		const list = await addList(schedule);
		console.log(list);
		return list;
	}

	checkValidities() {
		if (!this.#checkTitleLength()) return false;

		if (!this.#checkMemberSize()) return false;

		if (!this.#checkMemberValidity()) return false;

		return true;
	}

	#checkTitleLength() {
		if (this.form.title.length < this._minTitleLength) {
			alert('모임 제목은 세글자 이상이어야 합니다');
			return false;
		}
		return true;
	}

	#checkMemberSize() {
		if (this.form.howMany > this._maxMemberSize) {
			alert('참여인원은 20명 이내로 입력해야 합니다');
			return false;
		}
		return true;
	}

	#checkMemberValidity() {
		if (this.spllitedNames.length !== Number(this.form.howMany)) {
			console.log(this.spllitedNames.length);
			console.log('howmany', this.form.howMany);
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
