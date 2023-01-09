import React from 'react';
import uuid from 'react-native-uuid';
import { useSelector } from 'react-redux';
import StepItem from '../Reusable/StepItem';
import { StatusBar } from 'expo-status-bar';
import { RootState } from '../../types/redux';
import { RecipeFromI } from '../../types/recipe';
import { StyleSheet, View, Image, Text, FlatList } from 'react-native';

interface RenderItemPropsI {
	item: string;
	index: number;
}

export default function Recipe() {
	const recipe: RecipeFromI = useSelector((store: RootState) => store.recipeForm);

	return (
		<View style={styles.container}>
			<Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
			<View>
				<Text>{recipe.rate}</Text>
			</View>
			<View>
				<Text>{recipe.title}</Text>
				<Text>{recipe.description}</Text>
			</View>
			<View>
				<Text>Ingredients</Text>
				<FlatList
					data={recipe.ingredients}
					renderItem={({ item, index }: RenderItemPropsI) => {
						return (
							<View style={styles.item}>
								<Text style={styles.itemText}>
									{index + 1}. {item}
								</Text>
							</View>
						);
					}}
					keyExtractor={() => uuid.v4().toString()}
				/>
			</View>
			<View>
				<Text>Steps</Text>
				<FlatList
					data={recipe.steps}
					renderItem={StepItem}
					keyExtractor={() => uuid.v4().toString()}
				/>
			</View>
			<StatusBar style="auto" />
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
	},
	container: {
		flex: 1,
		marginTop: 25,
		paddingTop: 20,
		paddingHorizontal: 30,
	},
});
