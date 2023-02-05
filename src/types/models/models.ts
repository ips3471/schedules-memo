import { Dispatch, SetStateAction } from 'react';
import { ScheduleWithId } from '../interfaces/interfaces';

export type UpdateLists<T> = Dispatch<SetStateAction<T[]>>;
export type UpdateList<T> = Dispatch<SetStateAction<T>>;
