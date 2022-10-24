import React from 'react';
import { URL } from '../../../config';
import StarIcon from '../../../assets/icons/star';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';

export default function recipeBox({ item, onPressFunc }: any) {
	return(
		<TouchableOpacity onPress={() => { onPressFunc(item); }} style={styles.recipesBlockArea}>
			<ImageBackground source={{uri: `${URL}${item.image}`}} style={styles.recipesBlock}>
				<LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']} style={styles.linearGradient}>
					<View style={styles.rateBox}>
						<StarIcon width={8} height={8}/>
						<Text>{item.rate}</Text>
					</View>
					<View style={styles.recipeInf}>
						<Text style={styles.recipeTitle}>{item.title}</Text>
						<Text style={styles.recipeAuthor}>{item.authorLogin}</Text>
					</View>
				</LinearGradient>
			</ImageBackground>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	rateBox: {
		width: 35,
		marginLeft: '75%',
		borderRadius: 1000,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 5,
		backgroundColor: '#FFE1B3',
		justifyContent: 'space-around',
	},
	recipeInf: {

	},
	recipeTitle: {
		fontSize: 15,
		color: '#FFFFFF'
	},
	recipeAuthor: {
		fontSize: 12,
		color: '#A9A9A9'
	},
	recipesBlock: {
		width: 150,
		height: 150,
	},
	linearGradient: {
		width: 150,
		height: 150,
		paddingVertical: 15,
		paddingHorizontal: 15,
		justifyContent: 'space-between'
	},
	recipesBlockArea: {
		width: 150,
		height: 150,
		marginVertical: 10,
		marginHorizontal: 5,
	},
});