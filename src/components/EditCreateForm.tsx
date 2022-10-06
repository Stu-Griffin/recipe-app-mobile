import { RootState } from '../redux';
import { StatusBar } from 'expo-status-bar';
import { RecipeFormIError } from '../types/user';
import {Picker} from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputArea from './reusable-components/InputArea';
import { changeRecipeForm, reseteRecipeForm } from '../redux';
import SubmitButton from './reusable-components/SubmitButton';
import InputWithList from './reusable-components/InputWithList';
import regularValidation from '../extra-functions/regular-validation';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';

const typesArr = ['Appetizers', 'Salads', 'Soups', 'Main', 'Desserts'];

interface PropsI {
	navigation: any;
}

export default function EditCreateForm({navigation}: PropsI) {
	const dispatch = useDispatch();
	const recipe = useSelector((store: RootState) => store.recipe);
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const [error, setError] = useState<RecipeFormIError>({title: null, description: null, image: null, type: null});

	useEffect((): void => {
		console.log(error);
		setButtonStatus(Object.values(error).every((el: boolean) => (el===null)?false:((el===false)?true:false)));
	}, [error]);

	const submitFunction = (): void => {
		console.log('created');
	};

	const refreshFunc = (): void => {
		setButtonStatus(false);
		setError({title: false, description: false, image: false, type: false});
	};

	const cancelFunction = (): void => {
		refreshFunc();
		dispatch(reseteRecipeForm());
		navigation.navigate('sign-up');
	};

	const pickerFunc = (value: string): void => {
		dispatch(changeRecipeForm({value, key: 'type'}));
		setError({...error, type: (value==='') ? true : false});
	};

	const addImage = (): void => {
		console.log('image');
	};
	
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.pageTitle}>Create</Text>
			<View style={styles.form}>
				<Pressable onPress={addImage}>
					<View style={styles.addImgArea}>
						<Text style={styles.addImgAreaText}>Add Image</Text>
					</View>
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
				/>
				<InputWithList
					Title='Steps'
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
					Title={'Create'}
					Style={styles.button}
					Status={!buttonStatus}
					onPressFunc={submitFunction}
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