import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface PropsI {
	Style: object;
	Value: string;
	Title: string;
	ErrorMsg: string;
	ErrorStatus: boolean|null;
	ChangeValue: (value: string) => void;
}

export default function InputArea({Value, ChangeValue, Title, ErrorMsg, ErrorStatus, Style}: PropsI) {
	return (
		<View style={[styles.container, {...Style}]}>
			<View style={styles.textArea}>
				<Text style={styles.title}>{Title}</Text>
				{(ErrorStatus) && <Text style={styles.error}>{ErrorMsg}</Text>}
			</View>
			<TextInput style={styles.input} onChangeText={ChangeValue} value={Value}/>
		</View>
	);
} 

const styles = StyleSheet.create({
	container: {
		paddingTop: 10,
		paddingBottom: 10,
	},
	input: {
		marginTop: 10,
		borderWidth: 2,
		paddingTop: 10,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 10,
		paddingBottom: 10,
		borderColor: '#D9D9D9',
	},
	textArea: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	title: {
		fontSize: 18,
	},
	error: {
		color: 'red',
		fontSize: 15,
		marginLeft: 8,
	}
});