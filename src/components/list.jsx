import AppButton from './button/button';
import DateItem from './body/list/date';
import PlaceItem from './body/list/place';
import { useState } from 'react';
import ListPage from './body/list-page/list-page';

/*
곧 다가오는 일정일 경우 하이라이트
diffDay <= 4 ? 'orange' : ''
 */

function List({ list, handleDisplayLists, isPageCollapsed }) {
	const { title, howMany, place, date, state, code } = list;

	const [page, setPage] = useState(null);

	function onEnterClick(list) {
		const inserted = prompt('참여코드를 입력하세요');

		if (inserted == null) return;

		if (!_isCodeValid(inserted)) {
			alert('참여코드를 잘못 입력했습니다');
			return;
		}

		setPage(list);
		handleDisplayLists(false);

		function _isCodeValid(inserted) {
			return inserted === code;
		}
	}

	return (
		<div className='flex items-center justify-between px-appBody'>
			{isPageCollapsed && (
				<>
					<DateItem className='' date={date} />
					<PlaceItem title={title} place={place} />
					<span className='basis-10'>{howMany}명</span>
					<AppButton name={state} callback={() => onEnterClick(list)} />
				</>
			)}
			{!isPageCollapsed && page && <ListPage page={page} />}
		</div>
	);
}

export default List;
