import { Schedule, ScheduleWithId } from '../interfaces/interfaces';

export type AddScheduleFormProps = {
	toggleDialog(): void;
	onAddSchedule: (form: Schedule) => void;
};

export type ListsProps = {
	lists: ScheduleWithId[];
};

export type ListProps = {
	list: ScheduleWithId;
};

