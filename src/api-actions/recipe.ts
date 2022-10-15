import axios from 'axios';
import { URL } from '../../config';

class RecipeAPIActions {
	constructor(protected url: string) {}

	// async getAllRecipes(id: string) {
	// 	try {
	// 		const request = await axios.get(`${this.url}${id}`);
	// 		return request.data;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// async getOneRecipe(id: string) {
	// 	try {
	// 		const request = await axios.get(`${this.url}${id}`);
	// 		return request.data;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// async getAuthorsRecipes(id: string) {
	// 	try {
	// 		const request = await axios.get(`${this.url}${id}`);
	// 		return request.data;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	// async changeRecipe(id: string, user: any) {
	// 	try {
	// 		const request = await axios({
	// 			data: user,
	// 			method: 'put',
	// 			url: `${this.url}${id}`,
	// 			headers: { 'Content-Type': 'multipart/form-data' },
	// 		});
	// 		return request.data;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }

	async createRecipe(recipe: any) {
		try {
			const request = await axios({
				data: recipe,
				method: 'post',
				url: `${this.url}`,
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			return request.data;
		} catch (error) {
			console.log(error);
		}
	}

	// async deleteRecipe(id: string) {
	// 	try {
	// 		const request = await axios.get(`${this.url}${id}`);
	// 		return request.data;
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }
}

export default new RecipeAPIActions(`${URL}api/recipes/`);