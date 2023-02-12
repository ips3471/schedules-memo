import { Schedule } from '../interfaces/interfaces';

export type AddScheduleFormProps = {
	toggleDialog(): void;
	onAddSchedule: (form: Schedule) => void;
};

export type ListsProps = {
	lists: Schedule[];
	onDelete: (schedule: Schedule) => void;
};

export type ListProps = {
	list: Schedule;
	onDelete: (schedule: Schedule) => void;
};
