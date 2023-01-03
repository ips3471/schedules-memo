import { addList, addReceipt, updatePayment } from '../services/database';
import { v4 as uuid } from 'uuid';
class SubmitPresenter {
	constructor(form, list) {
		this.form = form;
		this._minTitleLength = 3;
		this._maxMemberSize = 20;
		this.list = list;
	}

	async updatePersonalPaid() {
		const { name, payment, whomToPay } = this.form;
		const equalByWhomToPay = Math.ceil(payment / whomToPay.length);

		const paymentCalculated = this.list.whoAre.map(who => {
			let whoUpdated = { ...who };
			if (whoUpdated.name === name) {
				whoUpdated = {
					...whoUpdated,
					paid: whoUpdated.paid + parseInt(payment),
				};
			}
			if (whomToPay.find(whom => whom === who.id)) {
				return {
					...whoUpdated,
					toPay: who.toPay + equalByWhomToPay,
				};
			}
			return whoUpdated;
		});

		updatePayment(this.list.id, paymentCalculated);
		return paymentCalculated;
	}

	async addSchedule() {
		const schedule = this.getScheduleItem();
		const response = await addList(schedule);
		console.log(response);
		return response;
	}

	async addReceipt(listId, category) {
		const { name, payment, where, whomToPay } = this.form;

		const receipt = {
			name,
			where,
			payment,
			whomToPay,
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
		const whoAre = this.form.people.split(',').map(name => {
			return { name: _getTrimmedObject(name), toPay: 0, paid: 0, id: uuid() };
		});

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
			return name.trim();
		}
	}
}

export default SubmitPresenter;
