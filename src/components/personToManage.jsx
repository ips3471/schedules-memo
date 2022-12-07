import React from 'react';

function PersonToManage({ username, cost }) {
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
