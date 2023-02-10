import { Schedule } from '../interfaces/interfaces';

export type AddScheduleFormProps = {
	toggleDialog(): void;
	onAddSchedule: (form: Schedule) => void;
};

export type ListsProps = {
	lists: Schedule[];
};

export type ListProps = {
	list: Schedule;
};
