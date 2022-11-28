import ListsPresenter from '../lists';

describe('listsPresenter', () => {
	let listsPresenter;
	beforeEach(() => {
		listsPresenter = new ListsPresenter([
			{
				title: '지리산',
				howMany: 6,
				date: 221202,
				location: '지리산자연휴양림',
				code: '1234',
			},
			{
				title: '설악산',
				howMany: 6,
				date: 230103,
				location: '설악산자연휴양림',
				code: '1234',
			},
		]);
	});
	it('load는 모든 리스트를 리턴합니다', () => {
		expect(listsPresenter.load()).toHaveLength(2);
	});
	it('add는 lists에 전달받은 리스트를 추가합니다', () => {
		const newList = {
			title: '한라산',
			howMany: 6,
			date: 2201205,
			location: '한라산자연휴양림',
			code: '1234',
		};
		listsPresenter.add(newList);

		expect(listsPresenter.load()).toHaveLength(3);
		expect(listsPresenter.load()[2]).toEqual(newList);
	});
	it('delete는 lists에서 전달받은 리스트를 제거합니다', () => {
		const list = listsPresenter.load()[0];
		listsPresenter.remove(list);

		expect(listsPresenter.load()).toHaveLength(1);
	});
	const a = [];
});
