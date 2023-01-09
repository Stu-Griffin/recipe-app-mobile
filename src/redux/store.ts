import { recipeFormSlice } from './recipe';
import { userSlice, userFormSlice } from './user';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore(
	{ 
		reducer: {
			user: userSlice.reducer, 
			userForm: userFormSlice.reducer, 
			recipeForm: recipeFormSlice.reducer
		} 
	}
);