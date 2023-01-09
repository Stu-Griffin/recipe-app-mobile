import { UserI, UserFormI } from '../types/user';

export const user: UserI = {
	id: '',
	login: '',
	email: '',
	avatar: '',
};
export const userForm: UserFormI = {
	email: '',
	login: '',
	avatar: '',
	password: '',
	confirmPassword: '',
	conditionAndTermsStatus: false,
};