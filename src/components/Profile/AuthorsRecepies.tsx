import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

interface PropsI {
	navigation: any;
}

export default function AuthoreRecepies({navigation}: PropsI) {
	const move = () => {
		navigation.navigate('home');
	};

	return (
		<View style={styles.container}>
			<View style={styles.pageTitleArea}>
				<TouchableOpacity onPress={move}>
					<Image style={styles.goBackIcon} source={require('../../../assets/icons/arrow-left.png')} />
				</TouchableOpacity>
				<Text style={styles.pageTitle}>Recepies</Text>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	pageTitleArea: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	pageTitle: {
		fontSize: 30,
		marginTop: 25,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	container: {
		flex: 1,
		marginTop: 25,
		paddingHorizontal: 30,
	},
	goBackIcon: {
		left: -100,
		width: 30,
		height: 30,
		position: 'absolute',
	}
});