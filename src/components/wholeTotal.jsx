import React from 'react';

function WholeTotal({ total }) {
	return (
		<div className='totalSum'>
			지금까지 소비한 금액: {total.toLocaleString('ko-KR')}
		</div>
	);
}

export default WholeTotal;
