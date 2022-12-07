import React from 'react';

function PersonToPay({ username, host, cost }) {
	return (
		<span>{`${username}님은 👑${host}에게 ${cost.toLocaleString('ko-KR', {
			style: 'currency',
			currency: 'KRW',
		})} 입금`}</span>
	);
}

export default PersonToPay;
