import { Schedule } from '../interfaces/interfaces';

export type AddScheduleFormProps = {
	toggleDialog(): void;
	onAddSchedule: (form: Schedule) => void;
};

export type ListsProps = {
	lists: Schedule[];
	onDelete: (schedule: Schedule) => void;
	onUpdate: (schedule: Schedule) => void;
	onSelect: (schedule: Schedule) => void;
	selected?: Schedule;
};

export type ListProps = {
	list: Schedule;
	onDelete: (schedule: Schedule) => void;
	onUpdate: (schedule: Schedule) => void;
	onSelect: (schedule: Schedule) => void;
	selected?: Schedule;
};

export type HeaderProps = {
	onRefresh: () => void;
};

export type NavItem = 'inProgress' | 'isFinished';
