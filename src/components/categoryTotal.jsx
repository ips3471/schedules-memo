import React from 'react';

function CategoryTotal({ title, total }) {
	return (
		<div className='total'>
			<span>
				{title}에 사용된 금액: {total.toLocaleString('ko-KR')}
			</span>
		</div>
	);
}

export default CategoryTotal;
