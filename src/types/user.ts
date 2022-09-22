export interface UserFormI {
	email: string;
	login: string;
	password: string;
	confirmPassword: string;
	[index: string]: string|boolean;
	condirionAndTermsStatus: boolean;
}

export interface UserFormIError {
	name?: boolean|null;
	email: boolean|null;
	password: boolean|null;
	checkPassword?: boolean|null;
}