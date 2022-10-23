import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function NavigationButton({ item, onPressFunc, activeType }: any) {
	return(
		<TouchableOpacity onPress={() => {
			onPressFunc(item);
		}} style={[styles.recipesBtn, (item.toLocaleLowerCase() === activeType) && styles.activeRecipesBtn]}>
			<Text style={(item.toLocaleLowerCase() === activeType) ? styles.activeRecipesBtnTitle : styles.unActiveRecipesBtnTitle}>{item}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	recipesBtn: {
		paddingTop: 5,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 10,
		marginBottom: 10,
		paddingBottom: 10,
		alignItems: 'center',
		marginHorizontal: 10,
		justifyContent: 'center',
	},
	activeRecipesBtn: {
		backgroundColor: '#129575',
	},
	activeRecipesBtnTitle: {
		color: 'white',
	},
	unActiveRecipesBtnTitle: {
		color: '#71B1A1',
	},
});