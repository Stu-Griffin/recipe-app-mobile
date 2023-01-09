import { store } from '../redux/store';

export interface ActionI {
	type: string;
	payload: any;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;