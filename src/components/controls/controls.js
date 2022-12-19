const category1 = '식당/카페';
const category2 = '마트/편의점';
const category3 = '티켓/입장료';
const category4 = '주유/주차비';
const category5 = '숙소/기타';

export function generateTitle(receiptItem) {
	switch (receiptItem) {
		case 'food':
			return category1;
			break;
		case 'mart':
			return category2;
			break;
		case 'ticket':
			return category3;
			break;
		case 'car':
			return category4;
			break;
		case 'reservation':
			return category5;
			break;
		default:
			console.error(`item not matched: check '${receiptItem}'`);
	}
}

export function generateCategory(list, receiptItem) {
	const { self, mart, ticket, car, reservation } = list.receipts;
	switch (receiptItem) {
		case self:
			return 'self';
			break;
		case mart:
			return 'mart';
			break;
		case ticket:
			return 'ticket';
			break;
		case car:
			return 'car';
			break;
		case reservation:
			return 'reservation';
			break;
		default:
			throw new Error('item not matched');
	}
}

export function calculateCost(total, list, isPaid) {
	return total / list.whoAre.length - isPaid;
}

export function toLocalCurrency(total, list, isPaid) {
	return calculateCost(total, list, isPaid || 0).toLocaleString('ko-KR', {
		style: 'currency',
		currency: 'KRW',
	});
}

export function getUserTotal(list, userName) {
	const categories = list.receipts;
	if (!categories) return;
	const reservation = categories.reservation
		? Object.values(categories.reservation).filter(
				item => item.name === userName,
		  ) //
		: [];
	const mart = categories.mart
		? Object.values(categories.mart).filter(item => item.name === userName) //
		: [];
	const ticket = categories.ticket
		? Object.values(categories.ticket).filter(item => item.name === userName) //
		: [];
	const car = categories.car
		? Object.values(categories.car).filter(item => item.name === userName) //
		: [];
	const food = categories.food
		? Object.values(categories.food).filter(item => item.name === userName) //
		: [];

	return (
		reservation.reduce((prev, curr) => prev + Number(curr.payment), 0) +
		mart.reduce((prev, curr) => prev + Number(curr.payment), 0) +
		ticket.reduce((prev, curr) => prev + Number(curr.payment), 0) +
		car.reduce((prev, curr) => prev + Number(curr.payment), 0) +
		food.reduce((prev, curr) => prev + Number(curr.payment), 0)
	);
}
