import React from 'react';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { RootState } from '../../types/redux';
import { StyleSheet, View } from 'react-native';
import { RecipeFromI } from '../../types/recipe';
import { NavigationI } from '../../types/navigation';
import CreareEditForm from '../Reusable/EditCreateForm';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import recipeAPIActions from '../../controller/api/recipe';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../controller/flash-message';

export default function Edit() {
	const navigation: NavigationI = useNavigation();
	const recipe: RecipeFromI = useSelector((store: RootState) => store.recipeForm);

	return (
		<View style={styles.container}>
			<CreareEditForm
				Title="Edit"
				navigation={navigation}
				submitFunction={async (newRecipe: FormData): Promise<void> => {
					let message = '';
					try {
						const { status } = await recipeAPIActions.changeRecipe(
							recipe['_id'],
							newRecipe
						);
						if (status === 200) {
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
