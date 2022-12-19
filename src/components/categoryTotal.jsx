import React from 'react';

function CategoryTotal({ title, total }) {
	return (
		<div className='text-orange-500'>
			<span>
				{title}에 사용된 금액: {total.toLocaleString('ko-KR')}
			</span>
		</div>
	);
}

export default CategoryTotal;
