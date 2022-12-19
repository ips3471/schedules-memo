import React from 'react';

function WholeTotal({ text, total }) {
	return (
		<div className='py-2 text-orange-300 font-bold'>
			{text}: {total.toLocaleString('ko-KR')}
		</div>
	);
}

export default WholeTotal;
