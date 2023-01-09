import { StatusBar } from 'expo-status-bar';
import { UserI } from '../../../types/user';
import RecipeBox from '../../Reusable/RecipeBox';
import React, { useState, useEffect } from 'react';
import { RecipeFromI } from '../../../types/recipe';
import { getRecipeForm } from '../../../redux/recipe';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationI } from '../../../types/navigation';
import { useNavigation } from '@react-navigation/native';
import { AppDispatch, RootState } from '../../../types/redux';
import recipeAPIActions from '../../../controller/api/recipe';
import ArrowLeftIcon from '../../../../assets/icons/arrow-left';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

export default function AuthoreRecepies() {
	const dispatch: AppDispatch = useDispatch();
	const navigation: NavigationI = useNavigation();
	const user: UserI = useSelector((store: RootState) => store.user);
	const [recipeList, setRecipeList] = useState<Array<RecipeFromI>>([]);

	useEffect(() => {
		getRecipes();
	}, []);

	const move = (route: string): void => {
		navigation.navigate(route);
	};

	const getRecipes = async (): Promise<void> => {
		try {
			const { data } = await recipeAPIActions.getAuthorsRecipes(user.id);
			setRecipeList(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.pageTitleArea}>
				<TouchableOpacity
					onPress={() => move('home')}
					style={styles.goBackIcon}>
					<ArrowLeftIcon />
				</TouchableOpacity>
				<Text style={styles.pageTitle}>Your recepies</Text>
			</View>
			<View style={styles.recipeArea}>
				<FlatList
					numColumns={2}
					data={recipeList}
					renderItem={({ item }) => {
						return (
							<RecipeBox
								item={item}
								onPressFunc={(recipe: RecipeFromI) => {
									move('recipe');
									dispatch(getRecipeForm(recipe));
								}}
							/>
						);
					}}
					keyExtractor={(item: RecipeFromI) => item['_id']}
				/>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
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
		top: 30,
		left: 0,
		position: 'absolute',
	},
	recipeArea: {
		height: 460,
		paddingVertical: 10,
		alignItems: 'center',
	},
	pageTitleArea: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
