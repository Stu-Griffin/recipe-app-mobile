import { UserFormI } from '../types/user';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const userForm: UserFormI = {
	email: '',
	login: '',
	password: '',
	confirmPassword: '',
	conditionAndTermsStatus: false,
};

const userSlice = createSlice({
	name: 'userForm',
	initialState: userForm,
	reducers: {
		changeUserForm: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		reseteUserForm: (state) => {
			state.email = '';
			state.login = '';
			state.password = '';
			state.confirmPassword = '';
			state.conditionAndTermsStatus = false;
		},
	}
});

export const { changeUserForm, reseteUserForm } = userSlice.actions;

export type RootState = ReturnType<typeof userSlice.reducer>;

export const store = configureStore({ reducer: userSlice.reducer });