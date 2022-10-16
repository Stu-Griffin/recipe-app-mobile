export interface RecipeFormIError {
	type: boolean|null;
	steps: boolean|null;
	title: boolean|null;
	image: boolean|null;
	description: boolean|null;
	ingredients: boolean|null;
}
export interface UserFormIErrorSignIn {
	email: boolean|null;
	password: boolean|null;
}
export interface UserFormIErrorSignUp {
	login: boolean|null;
	email: boolean|null;
	password: boolean|null;
	confirmPassword: boolean|null;
}