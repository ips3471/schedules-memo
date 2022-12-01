const category1 = '요고조고';
const category2 = '마트/편의점';
const category3 = '티켓/입장료';
const category4 = '주유/주차비';
const category5 = '숙소/기타';

export function generateTitle(list, receiptItem) {
	const { self, mart, ticket, car, reservation } = list.receipts;
	switch (receiptItem) {
		case self:
			return category1;
			break;
		case mart:
			return category2;
			break;
		case ticket:
			return category3;
			break;
		case car:
			return category4;
			break;
		case reservation:
			return category5;
			break;
		default:
			throw new Error('item not matched');
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
	return calculateCost(total, list, isPaid).toLocaleString('ko-KR', {
		style: 'currency',
		currency: 'KRW',
	});
}
