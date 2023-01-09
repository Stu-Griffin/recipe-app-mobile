export interface UserI {
	id: string;
	login: string;
	email: string;
	avatar: string;
	[index: string]: any;
}

export interface UserFormI {
	email: string;
	login: string;
	avatar: string;
	password: string;
	[index: string]: any;
	confirmPassword: string;
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