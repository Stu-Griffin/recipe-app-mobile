export interface RecipeFromI {
	rate: number;
	type: string;
	title: string;
	image: string;
	authorId: string;
	authorLogin: string;
	description: string;
	[index: string]: any;
	steps: Array<string>;
	ingredients: Array<string>;
}
export interface RecipeFormIError {
	type: boolean|null;
	steps: boolean|null;
	title: boolean|null;
	image: boolean|null;
	description: boolean|null;
	ingredients: boolean|null;
}