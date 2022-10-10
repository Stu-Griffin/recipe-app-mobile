import { createSlice, configureStore } from '@reduxjs/toolkit';

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
const userForm: any = {
	email: '',
	login: '',
	avatar: '',
	password: '',
	confirmPassword: '',
	conditionAndTermsStatus: false,
};
const user: any = {
	id: '',
	login: '',
	email: '',
	avatar: '',
};

const recipeFormSlice = createSlice({
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
const userFormSlice = createSlice({
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
const userSlice = createSlice({
	name: 'user',
	initialState: user,
	reducers: {
		setUser: (state, action) => {
			state = action.payload;
			return state;
		},
		changeUser: (state, action) => {
			state[action.payload.key] = action.payload.value;
		},
		reseteUser: (state) => {
			state.id = '';
			state.login = '';
			state.email = '';
			state.avatar = '';
		},
	}
});

export type UserRootState = ReturnType<typeof userSlice.reducer>;
export type UserFormRootState = ReturnType<typeof userFormSlice.reducer>;
export type RecipeFormRootState = ReturnType<typeof recipeFormSlice.reducer>;

export const { changeUser, reseteUser, setUser } = userSlice.actions;
export const { changeUserForm, reseteUserForm } = userFormSlice.actions;
export const { changeRecipeForm, reseteRecipeForm } = recipeFormSlice.actions;

export const store = configureStore({ reducer: {user: userSlice.reducer, userForm: userFormSlice.reducer, recipeForm: recipeFormSlice.reducer} });