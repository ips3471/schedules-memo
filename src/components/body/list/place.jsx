import React from 'react';
function PlaceItem({ from, to }) {
	return (
		<div className='flex py-1 flex-auto px-4 text-sm'>
			<div className='flex flex-col items-center items-between justify-center mr-2 '>
				<div className='flex items-center justify-center text-center w-5 h-5'>
					●
				</div>
				<div className=' flex flex-col justify-between items-center'>
					<span className='h-3'>·</span>
					<span className='h-3'>·</span>
				</div>
				<div className='flex items-center justify-center text-center w-5 h-5'>
					⊙
				</div>
			</div>
			<span className='flex flex-col justify-between basis-36'>
				<span>{from}</span>
				<span>{to}</span>
			</span>
		</div>
	);
}
export default PlaceItem;
