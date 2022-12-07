import React from 'react';
function PlaceItem({ title, place }) {
	return (
		<span className='flex flex-col basis-36'>
			<span>{title}</span>
			<span>{place}</span>
		</span>
	);
}
export default PlaceItem;
