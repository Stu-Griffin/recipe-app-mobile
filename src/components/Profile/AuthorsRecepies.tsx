import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import recipeAPIActions from '../../api-actions/recipe';
import RecipeBox from '../reusable-components/RecipeBox';
import { getRecipeForm, UserRootState } from '../../redux';
import ArrowLeftIcon from '../../../assets/icons/arrow-left.svg';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';

interface PropsI {
	navigation: any;
}

export default function AuthoreRecepies({ navigation }: PropsI) {
	const dispatch = useDispatch();
	const [recipeList, setRecipeList] = useState<Array<any>>([]);
	const { id }: any = useSelector((store: UserRootState) => store.user);

	useEffect(() => {
		getRecipes();
	}, []);

	const move = (route: string): void => {
		navigation.navigate(route);
	};

	const getRecipes = async (): Promise<void> => {
		try {
			const { data } = await recipeAPIActions.getAuthorsRecipes(id);
			setRecipeList(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.pageTitleArea}>
				<TouchableOpacity onPress={() => {
					move('home');
				}}>
					<ArrowLeftIcon style={styles.goBackIcon} width={30} height={30}/>
				</TouchableOpacity>
				<Text style={styles.pageTitle}>Your recepies</Text>
			</View>
			<View style={styles.recipeArea}>
				<FlatList
					numColumns={2}
					data={recipeList}
					renderItem={({ item }) => {
						return(
							<RecipeBox 
								item={item} 
								onPressFunc={(recipe: any) => {
									move('edit');
									dispatch(getRecipeForm(recipe));
								}}
							/>
						);
					}}
					keyExtractor={(item: any) => item['_id']}
				/>
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
		left: -80,
		position: 'absolute',
	},
	recipeArea: {
		height: 460,
		paddingVertical: 10,
		alignItems: 'center',
	},
});