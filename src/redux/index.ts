import { UserFormI } from '../types/user';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const userForm: UserFormI = {
	email: '',
	login: '',
	password: '',
	confirmPassword: '',
	condirionAndTermsStatus: false,
};

const userSlice = createSlice({
	name: 'userForm',
	initialState: userForm,
	reducers: {
		changeUserForm: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
	}
});

export const { changeUserForm } = userSlice.actions;

export type RootState = ReturnType<typeof userSlice.reducer>;

export const store = configureStore({ reducer: userSlice.reducer });