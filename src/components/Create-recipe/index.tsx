import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import recipeAPIActions from '../../api-actions/recipe';
import { showMessage } from 'react-native-flash-message';
import CreareEditForm from '../reusable-components/EditCreateForm';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../extra-functions/flash-message';

interface PropsI {
	navigation: any;
}

export default function Create({ navigation }: PropsI) {
	return (
		<View style={styles.container}>
			<CreareEditForm
				Title='Create'
				navigation={navigation}
				submitFunction={async (recipe: any): Promise<void> => {
					let message = '';
					try {
						const response = await recipeAPIActions.createRecipe(recipe);
						if(response.status === 200) {
							message = 'The recipe was saved succesfully';
						} else {
							message = 'We are so sorry, there was an error';
						}
						showMessage({
							duration: 2500,
							description: message,
							type: getTypeForFlashMsg(response.status),
							message: getMessageForFlashMsg(response.status),
						});
						navigation.navigate('home');
					} catch(error) {
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