export interface Schedule {
	date: string;
	from: string;
	id?: string;
	mission: string;
	reward: number;
	time: string;
	to: string;
	uid: string;
	state: State;
	displayName?: string;
}

export type State = 'pending' | 'confirmed' | 'canceled' | 'finished' | 'paid';
