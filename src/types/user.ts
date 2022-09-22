export interface UserFormI {
	email: string;
	login: string;
	password: string;
	confirmPassword: string;
	[index: string]: string|boolean;
	conditionAndTermsStatus: boolean;
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