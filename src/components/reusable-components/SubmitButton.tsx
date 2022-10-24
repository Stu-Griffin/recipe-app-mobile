import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface PropsI {
	Title: string;
	Style: object;
	Status: boolean;
	onPressFunc: () => void;
}

export default function SubmitButton({Title, Style, Status, onPressFunc}: PropsI) {
	return (
		<TouchableOpacity disabled={Status} onPress={onPressFunc} style={[styles.button, Style, (Status) ? {opacity: 0.6} : {opapcity: 1}]}>
			<Text style={styles.text}>{Title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	button: {
		marginTop: 10,
		paddingTop: 15,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 10,
		paddingBottom: 15,
		backgroundColor: '#129575',
	},
});