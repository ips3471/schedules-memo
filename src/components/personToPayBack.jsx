import React from 'react';

function PersonToPayBack({ username, host, toPayBack }) {
	return (
		<span className='text-lime-500'>
			{username}님은 👑{host}에게{' '}
			{toPayBack.toLocaleString('ko-KR', {
				style: 'currency',
				currency: 'KRW',
			})}{' '}
			받음
		</span>
	);
}

export default PersonToPayBack;
