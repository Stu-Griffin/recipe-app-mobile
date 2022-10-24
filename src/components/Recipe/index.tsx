import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { RecipeFormRootState } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import recipeAPIActions from '../../api-actions/recipe';
import { showMessage } from 'react-native-flash-message';
import CreareEditForm from '../reusable-components/EditCreateForm';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../extra-functions/flash-message';

interface PropsI {
	navigation: any;
}

export default function Recipe({ navigation }: PropsI) {
	const dispatch = useDispatch();
	const recipe: any = useSelector((store: RecipeFormRootState) => store.recipeForm);

	return (
		<View style={styles.container}>
			
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});