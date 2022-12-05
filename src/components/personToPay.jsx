import React from 'react';
import { getUserTotal } from './controls/controls';

function PersonToPay({ total, list, member, username, host, cost }) {
	const equal = total / member;
	const paid = getUserTotal(list, username);
	const toPay = equal - paid;
	return (
		<span>{`${username}님은 👑${host}에게 ${cost.toLocaleString('ko-KR', {
			style: 'currency',
			currency: 'KRW',
		})} 입금`}</span>
	);
}

export default PersonToPay;
