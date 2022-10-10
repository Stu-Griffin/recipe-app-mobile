import axios from 'axios';

class UserAPIActions {
	constructor(protected url: string) {}

	async signInUser(user: any) {
		try {
			const request = await axios.post(`${this.url}users/sign-in`, user);
			return request.data;
		} catch (error) {
			console.log(error);
		}
	}

	async signUpUser(user: any) {
		try {
			const request = await axios.post(`${this.url}users/sign-up`, user);
			return request.data;
		} catch (error) {
			console.log(error);
		}
	}

	async getUser(id: string) {
		try {
			const request = await axios.get(`${this.url}users/${id}`);
			return request.data;
		} catch (error) {
			console.log(error);
		}
	}
}

export default new UserAPIActions('https://api-recipe.herokuapp.com/api/');