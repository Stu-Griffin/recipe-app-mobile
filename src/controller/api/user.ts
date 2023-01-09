import axios from 'axios';
import { URL } from '../../../config';

class UserAPIActions {
	constructor(protected url: string) {}
	
	async getUser(id: string) {
		try {
			const request = await axios.get(`${this.url}${id}`);
			return request.data;
		} catch (error) {
			console.log(error);
		}
	}

	async signInUser(user: any) {
		try {
			const request = await axios.post(`${this.url}sign-in`, user);
			return request.data;
		} catch (error) {
			console.log(error);
		}
	}

	async signUpUser(user: any) {
		try {
			const request = await axios.post(`${this.url}sign-up`, user);
			return request.data;
		} catch (error) {
			console.log(error);
		}
	}

	async changeUser(id: string, user: any) {
		try {
			const request = await axios({
				data: user,
				method: 'put',
				url: `${this.url}${id}`,
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			return request.data;
		} catch (error) {
			console.log(error);
		}
	}
}

export default new UserAPIActions(`${URL}api/users/`);