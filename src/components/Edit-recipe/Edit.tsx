import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { RecipeFormRootState } from '../../redux';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import recipeAPIActions from '../../api-actions/recipe';
import { showMessage } from 'react-native-flash-message';
import CreareEditForm from '../reusable-components/EditCreateForm';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../extra-functions/flash-message';

interface PropsI {
	navigation: any;
}

export default function Edit({navigation}: PropsI) {
	const dispatch = useDispatch();
	const recipe: any = useSelector((store: RecipeFormRootState) => store.recipeForm);

	return (
		<View style={styles.container}>
			<CreareEditForm
				Title='Edit'
				navigation={navigation}
				submitFunction={async (newRecipe: any): Promise<void> => {
					let message = '';
					try {
						const { status } = await recipeAPIActions.changeRecipe(recipe['_id'], newRecipe);
						if(status === 200) {
							message = 'The changes were saved succesfully';
						} else {
							message = 'We are so sorry, there was an error';
						}
						showMessage({
							duration: 2500,
							description: message,
							type: getTypeForFlashMsg(status),
							message: getMessageForFlashMsg(status),
						});
						navigation.navigate('home');
					} catch (error) {
						showMessage({
							duration: 2500,
							type: getTypeForFlashMsg(404),
							message: getMessageForFlashMsg(404),
							description: 'We are so sorry, there was an error',
						});
					}
				}}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});