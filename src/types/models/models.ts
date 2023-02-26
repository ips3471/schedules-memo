import { Dispatch, SetStateAction } from 'react';

export type UpdateLists<T> = Dispatch<SetStateAction<T[]>>;
export type UpdateList<T> = Dispatch<SetStateAction<T>>;

export type PushMessage = {
	title: string;
	body: string;
};

export type MyDate = {
	date: number;
	available: boolean;
	day: '월' | '화' | '수' | '목' | '금' | '토' | '일';
};

export type User = {
	uid: string;
	token?: string;
};

export type SendNotificationType =
	| 'changed'
	| 'submitted'
	| 'head-out'
	| 'arrived'
	| 'accounted';
