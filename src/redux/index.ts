import { createSlice, configureStore } from '@reduxjs/toolkit';

const user: any = {
	id: '',
	login: '',
	email: '',
	avatar: '',
};
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

const userSlice = createSlice({
	name: 'user',
	initialState: user,
	reducers: {
		reseteUser: (state) => {
			state.id = '';
			state.login = '';
			state.email = '';
			state.avatar = '';
		},
		setUser: (state, action) => {
			return action.payload;
		},
		changeUser: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
	}
});
const userFormSlice = createSlice({
	name: 'userForm',
	initialState: userForm,
	reducers: {
		reseteUserForm: (state) => {
			state.email = '';
			state.login = '';
			state.password = '';
			state.confirmPassword = '';
			state.conditionAndTermsStatus = false;
		},
		changeUserForm: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
	}
});
const recipeFormSlice = createSlice({
	name: 'recipeFrom',
	initialState: recipeFrom,
	reducers: {
		reseteRecipeForm: (state) => {
			state.rate = 0;
			state.type = '';
			state.title = '';
			state.image = '';
			state.steps = [];
			state.authorId = '';
			state.authorLogin = '';
			state.description = '';
			state.ingredients = [];
		},
		getRecipeForm: (state, action) => {
			return action.payload;
		},
		changeRecipeForm: (state, action) => {
			if(action.payload.key === 'ingredients' || action.payload.key === 'steps') {
				state[action.payload.key].push(action.payload.value);
			} else {
				state[action.payload.key] = action.payload.value;
			}
		},
		deleteFromRecipeForm: (state, action) => {
			if(action.payload.key === 'ingredients' || action.payload.key === 'steps') {
				state[action.payload.key] = state[action.payload.key].filter((el: string, id: number) => action.payload.value !== id);
			}
		},
	}
});

export type UserRootState = ReturnType<typeof userSlice.reducer>;
export type UserFormRootState = ReturnType<typeof userFormSlice.reducer>;
export type RecipeFormRootState = ReturnType<typeof recipeFormSlice.reducer>;

export const { changeUser, reseteUser, setUser } = userSlice.actions;
export const { changeUserForm, reseteUserForm } = userFormSlice.actions;
export const { changeRecipeForm, reseteRecipeForm, deleteFromRecipeForm, getRecipeForm } = recipeFormSlice.actions;

export const store = configureStore({ reducer: {user: userSlice.reducer, userForm: userFormSlice.reducer, recipeForm: recipeFormSlice.reducer} });