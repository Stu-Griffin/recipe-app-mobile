import { ActionI } from '../types/redux';
import { createSlice } from '@reduxjs/toolkit';
import { user, userForm } from '../model/user';
import { UserFormI, UserI } from '../types/user';

export const userSlice = createSlice({
	name: 'user',
	initialState: user,
	reducers: {
		reseteUser: (state: UserI): void => {
			state.id = '';
			state.login = '';
			state.email = '';
			state.avatar = '';
		},
		setUser: (state: UserI, action: ActionI): UserI => {
			return action.payload;
		},
		changeUser: (state: UserI, action: ActionI): void => {
			state[action.payload.key] = action.payload.value;
		},
	}
});

export const userFormSlice = createSlice({
	name: 'userForm',
	initialState: userForm,
	reducers: {
		reseteUserForm: (state: UserFormI): void => {
			state.email = '';
			state.login = '';
			state.password = '';
			state.confirmPassword = '';
			state.conditionAndTermsStatus = false;
		},
		changeUserForm: (state: UserFormI, action: ActionI): void => {
			state[action.payload.key] = action.payload.value;
		},
	}
});

export const { changeUser, reseteUser, setUser } = userSlice.actions;
export const { changeUserForm, reseteUserForm } = userFormSlice.actions;