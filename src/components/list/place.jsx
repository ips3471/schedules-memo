import React from 'react';
function PlaceItem({ title, place }) {
	return (
		<span className='flex flex-col'>
			<span>{title}</span>
			<span>{place}</span>
		</span>
	);
}
export default PlaceItem;
