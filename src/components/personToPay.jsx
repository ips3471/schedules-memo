import React from 'react';

function PersonToPay({ username, host, cost }) {
	return (
		<span>{`${username}λμ π${host}μκ² ${(cost * -1).toLocaleString(
			'ko-KR',
			{
				style: 'currency',
				currency: 'KRW',
			},
		)} μκΈ`}</span>
	);
}

export default PersonToPay;
