import InputArea from './InputArea';
import { URL } from '../../../config';
import SubmitButton from './SubmitButton';
import { StatusBar } from 'expo-status-bar';
import InputWithList from './InputWithList';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { RecipeFormIError } from '../../types/user';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import regularValidation from '../../extra-functions/regular-validation';
import { StyleSheet, View, Text, ScrollView, Pressable, Image } from 'react-native';
import { changeRecipeForm, reseteRecipeForm, RecipeFormRootState } from '../../redux';

interface PropsI {
	Title: string;
	navigation: any;
	submitFunction: (recipe: any) => void;
}

interface RecipeBufferI {
	uri: string;
	type: string;
	name: string;
	fileName: string;
}

const typesArr = ['Appetizers', 'Salads', 'Soups', 'Main', 'Desserts'];

export default function EditCreateForm({navigation, Title, submitFunction}: PropsI) {
	const dispatch = useDispatch();
	const newRecipe: any = new FormData();
	const [key, setKey] = useState<string>('');
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const [recipeBuffer, setRecipeBuffer] = useState<RecipeBufferI>();
	const user = useSelector((store: RecipeFormRootState) => store.user);
	const recipe = useSelector((store: RecipeFormRootState) => store.recipeForm);
	const [error, setError] = useState<RecipeFormIError>({ingredients: null, steps: null, title: null, description: null, image: null, type: null});

	useEffect((): void => {
		(Title === 'Edit') ? setButtonStatus(Object.values(error).some((el: boolean) => (el===null)?false:((el===false)?true:false))) : setButtonStatus(Object.values(error).every((el: boolean) => (el===null)?false:((el===false)?true:false)));
	}, [error]);

	useEffect((): void => {
		if(key !== '') {
			(recipe[key]?.length === 0) ? setError({...error, [key]: true}) : setError({...error, [key]: false});
		}
	}, [recipe, key]);

	const refreshFunc = (): void => {
		setButtonStatus(false);
		setError({ingredients: null, steps: null, title: null, description: null, image: null, type: null});
	};

	const cancelFunction = (): void => {
		refreshFunc();
		dispatch(reseteRecipeForm());
		navigation.navigate('home');
	};

	const pickerFunc = (value: string): void => {
		dispatch(changeRecipeForm({value, key: 'type'}));
		setError({...error, type: (value==='') ? true : false});
	};

	const createNewRecipeFormData = (): void => {
		if(!regularValidation(recipe.type)) newRecipe.append('type', recipe.type);
		if(!regularValidation(recipe.steps)) newRecipe.append('steps', recipe.steps);
		if(!regularValidation(recipe.title)) newRecipe.append('title', recipe.title);
		if(!regularValidation(recipe.image)) newRecipe.append('image', recipeBuffer);
		if(!regularValidation(recipe.authorId)) newRecipe.append('authorId', recipe.authorId);
		if(!regularValidation(recipe.authorLogin)) newRecipe.append('authorLogin', recipe.authorLogin);
		if(!regularValidation(recipe.description)) newRecipe.append('description', recipe.description);
		if(!regularValidation(recipe.ingredients)) newRecipe.append('ingredients', recipe.ingredients);
	};

	const pickImage = async (): Promise<void> => {
		// No permissions request is necessary for launching the image library
		try {
			const { uri, cancelled }: any = await ImagePicker.launchImageLibraryAsync({
				quality: 1,
				aspect: [4, 3],
				allowsEditing: true,
				mediaTypes: ImagePicker.MediaTypeOptions.All,
			});
			const imageExtension: string = uri.split('.').reverse()[0];
			if (!cancelled) {
				setRecipeBuffer({
					uri: uri,
					fileName: 'image',
					type: `image/${imageExtension}`,
					name: `avatar.${imageExtension}`,
				});
				setError({...error, image: false});
				dispatch(changeRecipeForm({value :uri, key: 'image'}));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getImgUrl = (uri: string) => {
		return (uri.split('/')[0] === 'assets') ? `${URL}${recipe.image}` : recipe.image;
	};
	
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.pageTitle}>{Title}</Text>
			<View style={styles.form}>
				<Pressable onPress={pickImage}>
					{(recipe.image !== '') ?
						<Image style={styles.addImgArea} source={{ uri: getImgUrl(recipe.image)}}/> :
						<View style={styles.addImgArea}>
							<Text style={styles.addImgAreaText}>Add Image</Text>
						</View>
					}
				</Pressable>
				{(error.type) && <Text style={styles.error}>Choose type of recipe</Text>}
				<View style={styles.picker}>
					<Picker
						selectedValue={recipe.type}
						onValueChange={pickerFunc}
					>
						<Picker.Item label='Type' value='' />
						{typesArr.map((el: string, id: number) => {
							return (
								<Picker.Item key={id} label={el} value={el.toLowerCase()} />
							);
						})}
					</Picker>
				</View>
				<InputArea
					Style={{}}
					Value={recipe.title}
					Title={'Recipe Title'}
					ErrorMsg={'Enter a title'}
					ErrorStatus={error.title}
					ChangeValue={(value: string) => {
						dispatch(changeRecipeForm({value, key: 'title'}));
						setError({...error, title: regularValidation(value)});
					}}
				/>
				<InputArea
					Style={{}}
					Value={recipe.description}
					Title={'Recipe Description'}
					ErrorMsg={'Enter a description'}
					ErrorStatus={error.description}
					ChangeValue={(value: string) => {
						dispatch(changeRecipeForm({value, key: 'description'}));
						setError({...error, description: regularValidation(value)});
					}}
				/>
				<InputWithList
					Title='Ingredients'
					ErrorHandler={(key: string) => {
						setKey(key);
					}}
				/>
				<InputWithList
					Title='Steps'
					ErrorHandler={(key: string) => {
						setKey(key);
					}}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<SubmitButton
					Title={'Cancel'}
					Style={styles.button}
					Status={false}
					onPressFunc={cancelFunction}
				/>
				<SubmitButton
					Title={Title}
					Style={styles.button}
					Status={!buttonStatus}
					onPressFunc={(): void => {
						createNewRecipeFormData();
						submitFunction(newRecipe);
						refreshFunc();
						dispatch(reseteRecipeForm());
					}}
				/>
			</View>
			<StatusBar style="auto" />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	addImgArea: {
		height: 150,
		width: '100%',
		borderRadius: 10,
		marginBottom: 20,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#129575',
	},
	addImgAreaText: {
		fontSize: 25,
		color: 'white',
		fontWeight: 'bold',
	},
	pageTitle: {
		fontSize: 30,
		marginTop: 25,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	error: {
		color: 'red',
		fontSize: 15,
		marginLeft: 8,
	},
	container: {
		flex: 1,
		marginTop: 25,
		paddingHorizontal: 30,
	},
	picker: {
		marginTop: 10, 
		borderWidth: 2, 
		paddingLeft: 10,
		borderRadius: 10, 
		borderColor: '#D9D9D9', 
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	text: {
		fontSize: 20,
	},
	form: {
		marginTop: 25,
	},
	linkArea: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	link: {
		color: '#FF9C00',
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between', 
	},
	button: {
		width: 125,
		marginTop: 50,
		marginBottom: 50
	}
});