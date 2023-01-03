import React from 'react';

function PersonToManage({ username, cost }) {
	return (
		<span>
			{username}{' '}
			{`총 ${cost.toLocaleString('ko-KR', {
				style: 'currency',
				currency: 'KRW',
			})} 지출`}
		</span>
	);
}

export default PersonToManage;
