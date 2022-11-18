import React from 'react';
import DeleteIcon from '../../../assets/icons/delete';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StepIngredientItem({ action, el, id, buttonType }: any) {
	return(
		<View style={styles.box}>
			<Text style={styles.text}>{el}</Text>
			<TouchableOpacity onPress={() => { action(id); }}>
				{(buttonType === 'delete') ? <DeleteIcon width={35} height={35}/> : <DeleteIcon width={35} height={35}/>}
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	box: {
		paddingVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
	},
	text: {
		fontSize: 20
	},
});