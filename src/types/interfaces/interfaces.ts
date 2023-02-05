export interface Schedule {
	from: string;
	to: string;
	isAllow: boolean;
	reward: number;
	mission: string;
	date: string;
	time: string;
}

export interface ScheduleWithId extends Schedule {
	id: string;
}
