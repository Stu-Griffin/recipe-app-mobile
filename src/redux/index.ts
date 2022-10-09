import { createSlice, configureStore } from '@reduxjs/toolkit';

const userForm: any = {
	email: '',
	login: '',
	avatar: '',
	password: '',
	confirmPassword: '',
	conditionAndTermsStatus: false,
};

const recipeFrom: any = {
	rate: 0,
	type: '',
	title: '',
	image: '',
	steps: [],
	authorId: '',
	authorLogin: '',
	description: '',
	ingredients: [],
};

const recipeSlice = createSlice({
	name: 'recipeFrom',
	initialState: recipeFrom,
	reducers: {
		changeRecipeForm: (state, action) => {
			if(action.payload.key === 'ingredients' || action.payload.key === 'steps') {
				state[action.payload.key].push(action.payload.value);
			} else {
				state[action.payload.key] = action.payload.value;
			}
		},
		reseteRecipeForm: (state) => {
			state.rate = 0;
			state.type = '';
			state.title = '';
			state.image = '';
			state.steps = null;
			state.authorId = '';
			state.authorLogin = '';
			state.description = '';
			state.ingredients = null;
		},
	}
});

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
export type RootState = ReturnType<typeof userSlice.reducer>;

export const { changeUserForm, reseteUserForm } = userSlice.actions;

export const { changeRecipeForm, reseteRecipeForm } = recipeSlice.actions;

export const store = configureStore({ reducer: {user: userSlice.reducer, recipe: recipeSlice.reducer} });