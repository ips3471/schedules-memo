import React from 'react';
import { getUserTotal } from './controls/controls';

function PersonToManage({ username, total, list, member, cost }) {
	const equal = total / member;
	const paid = getUserTotal(list, username);
	const toPay = equal - paid;
	return (
		<span>
			{username} 개인 지출:{' '}
			{cost.toLocaleString('ko-KR', {
				style: 'currency',
				currency: 'KRW',
			})}
		</span>
	);
}

export default PersonToManage;
