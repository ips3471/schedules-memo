import React from 'react';

function PersonToPayBack({ username, host, toPayBack }) {
	const toPositive = toPayBack * -1;
	return (
		<span className='payback'>
			{username}님은 👑{host}에게{' '}
			{toPositive.toLocaleString('ko-KR', {
				style: 'currency',
				currency: 'KRW',
			})}{' '}
			받음
		</span>
	);
}

export default PersonToPayBack;
