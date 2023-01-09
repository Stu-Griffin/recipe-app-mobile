import { recipeFrom } from '../model/recipe';
import { createSlice } from '@reduxjs/toolkit';

import { ActionI } from '../types/redux';
import { RecipeFromI } from '../types/recipe';

export const recipeFormSlice = createSlice({
	name: 'recipeFrom',
	initialState: recipeFrom,
	reducers: {
		reseteRecipeForm: (state: RecipeFromI): void => {
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
		changeRecipeForm: (state: RecipeFromI, action: ActionI): void => {
			if(action.payload.key === 'ingredients' || action.payload.key === 'steps') {
				state[action.payload.key].push(action.payload.value);
			} else {
				state[action.payload.key] = action.payload.value;
			}
		},
		deleteFromRecipeForm: (state: RecipeFromI, action: ActionI): void => {
			if(action.payload.key === 'ingredients' || action.payload.key === 'steps') {
				state[action.payload.key] = state[action.payload.key].filter((el: string, id: number) => action.payload.value !== id);
			}
		},
		getRecipeForm: (state: RecipeFromI, action: ActionI): RecipeFromI => {
			return action.payload;
		},
	}
});

export const { changeRecipeForm, reseteRecipeForm, deleteFromRecipeForm, getRecipeForm } = recipeFormSlice.actions;