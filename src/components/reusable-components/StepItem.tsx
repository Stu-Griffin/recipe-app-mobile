import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CheckedIcon from '../../../assets/icons/checked';

interface PropsI {
	item: string;
}

export default function StepItem({ item }: PropsI) {
	return (
		<View style={styles.item}>
			<CheckedIcon width={30} height={30}/>
			<Text style={styles.itemText}>{item}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	item: {
		paddingVertical: 10,
		borderBottomWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: 'black',
	},
	itemText: {
		left: 15,
		fontSize: 18,
	}
});