import { addList, addReceipt } from '../services/database';
import { v4 as uuid } from 'uuid';
class SubmitPresenter {
	constructor(form) {
		this.form = form;
		this._minTitleLength = 3;
		this._maxMemberSize = 20;
	}

	async addSchedule() {
		const schedule = this.getScheduleItem();
		const response = await addList(schedule);
		console.log(response);
		return response;
	}

	async addReceipt(listId, category) {
		const receipt = {
			name: this.form.name,
			where: this.form.where,
			payment: this.form.payment,
		};
		const response = await addReceipt(listId, category, receipt);
		return response;
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
		if (this.form.people.split(',').length !== Number(this.form.howMany)) {
			console.log(this.form.people.split(',').length);
			console.log('howmany', this.form.howMany);
			alert('참여인원의 수와 입력된 참여자의 수가 일치하지 않습니다');
			return false;
		}
		return true;
	}

	getScheduleItem() {
		const whoAre = this.form.people
			.split(',')
			.map(name => _getTrimmedObject(name));

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
				id: uuid(),
			};
		}
	}
}

export default SubmitPresenter;
