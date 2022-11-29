import ListsPresenter from '../lists';

describe('listsPresenter', () => {
	let listsPresenter;
	let update;
	let lists;

	beforeEach(() => {
		lists = [
			{
				id: '1',
				title: '지리산',
				howMany: 6,
				date: '22-12-02',
				place: '지리산자연휴양림',
				code: '1234',
				state: '완료',
			},
			{
				id: '2',
				title: '설악산',
				howMany: 6,
				date: '23-01-03',
				place: '설악산자연휴양림',
				code: '1234',
				state: '입장',
			},
		];
		listsPresenter = new ListsPresenter(lists);
		update = jest.fn();
	});

	it('load는 모든 리스트를 리턴합니다', () => {
		expect(listsPresenter.load()).toEqual(lists);
	});

	describe('add', () => {
		it('lists에 전달받은 리스트를 추가하고 state를 업데이트합니다', () => {
			const newList = {
				id: '3',
				title: '한라산',
				howMany: 6,
				date: 2201205,
				place: '한라산자연휴양림',
				code: '1234',
				state: '입장',
			};
			listsPresenter.add(newList, update);

			expect(listsPresenter.load()[2].title).toBe('한라산');
			checkUpdateIsCalled();
		});

		it('모임 이름이 공백일 경우 add를 수행하지 않습니다', () => {
			const newList = {
				id: '3',
				title: '',
				howMany: 6,
				date: 2201205,
				place: '한라산자연휴양림',
				code: '1234',
				state: '입장',
			};
			listsPresenter.add(newList, update);

			expect(listsPresenter.load().length).toBe(2);
			expect(update).toHaveBeenCalledTimes(0);
		});
		it('참여 인원이 공백일 경우 add를 수행하지 않습니다', () => {
			const newList = {
				id: '3',
				title: '한라산',
				howMany: undefined,
				date: 2201205,
				place: '한라산자연휴양림',
				code: '1234',
				state: '입장',
			};
			listsPresenter.add(newList, update);

			expect(listsPresenter.load().length).toBe(2);
			expect(update).toHaveBeenCalledTimes(0);
		});
		it('모임 날짜가 공백일 경우 add를 수행하지 않습니다', () => {
			const newList = {
				id: '3',
				title: '한라산',
				howMany: 6,
				date: undefined,
				place: '한라산자연휴양림',
				code: '1234',
				state: '입장',
			};
			listsPresenter.add(newList, update);

			expect(listsPresenter.load().length).toBe(2);
			expect(update).toHaveBeenCalledTimes(0);
		});
		it('모임 장소가 공백일 경우 add를 수행하지 않습니다', () => {
			const newList = {
				id: '3',
				title: '한라산',
				howMany: 6,
				date: 2201205,
				place: '',
				code: '1234',
				state: '입장',
			};
			listsPresenter.add(newList, update);

			expect(listsPresenter.load().length).toBe(2);
			expect(update).toHaveBeenCalledTimes(0);
		});
		it('참여 코드가 공백일 경우 add를 수행하지 않습니다', () => {
			const newList = {
				id: '3',
				title: '한라산',
				howMany: 6,
				date: 2201205,
				place: '한라산자연휴양림',
				code: '',
				state: '입장',
			};
			listsPresenter.add(newList, update);

			expect(listsPresenter.load().length).toBe(2);
			expect(update).toHaveBeenCalledTimes(0);
		});
	});

	it('delete는 lists에서 전달받은 리스트를 제거합니다', () => {
		listsPresenter.remove(lists[0], update);

		expect(listsPresenter.load().length).toBe(1);
		expect(listsPresenter.load()[0].title).toBe('설악산');
		checkUpdateIsCalled();
	});

	function checkUpdateIsCalled() {
		expect(update).toHaveBeenCalledTimes(1);
		expect(update).toHaveBeenCalledWith(listsPresenter.load());
	}
});
