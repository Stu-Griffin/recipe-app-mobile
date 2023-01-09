import { URL } from '../../../config';
import { UserI } from '../../types/user';
import { setUser } from '../../redux/user';
import { StatusBar } from 'expo-status-bar';
import InputArea from '../Reusable/InputArea';
import RecipeBox from '../Reusable/RecipeBox';
import { RecipeFromI } from '../../types/recipe';
import React, { useEffect, useState } from 'react';
import { NavigationI } from '../../types/navigation';
import userAPIActions from '../../controller/api/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import recipeAPIActions from '../../controller/api/recipe';
import { AppDispatch, RootState } from '../../types/redux';
import NavigationButton from '../Reusable/NavigationButton';
import AddButtonIcon from '../../../assets/icons/add-button';
import { getRecipeForm, changeRecipeForm } from '../../redux/recipe';
import FilterSettingsIcon from '../../../assets/icons/filter-setting';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../controller/flash-message';

const typesArr = ['Appetizers', 'Salads', 'Soups', 'Main', 'Desserts'];

export default function Home() {
	const dispatch: AppDispatch = useDispatch();
	const navigation: NavigationI = useNavigation();
	const [search, setSearch] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [recipeList, setRecipeList] = useState<Array<RecipeFromI>>([]);
	const user: UserI = useSelector((store: RootState) => store.user);
	const [activeType, setActiveType] = useState<string>(typesArr[0].toLocaleLowerCase());

	useEffect((): void => {
		getUserInf();
	}, [user.id]);

	useEffect((): void => {
		getRecipes();
	}, [activeType, currentPage]);

	const loadMoreItem = () => {
		setCurrentPage(currentPage + 1);
	};

	const move = (route: string): void => {
		navigation.navigate(route);
	};

	const getUserInf = async (): Promise<void> => {
		try {
			const { data, status } = await userAPIActions.getUser(
				user.id || '6343c69dab75c7cd862d045b'
			);
			if (status === 200) {
				dispatch(
					setUser({
						id: data['_id'],
						login: data?.login,
						email: data?.email,
						avatar: data?.avatar,
					})
				);
			} else {
				showMessage({
					duration: 5000,
					description: data,
					type: getTypeForFlashMsg(status),
					message: getMessageForFlashMsg(status),
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getRecipes = async (): Promise<void> => {
		try {
			const { data } = await recipeAPIActions.getAllRecipes(
				activeType,
				currentPage.toString()
			);
			setRecipeList([...recipeList, ...data]);
			// setRecipeList(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerText}>
					<Text style={styles.title}>Hello {user.login}</Text>
					<Text style={styles.text}>What are you cooking today?</Text>
				</View>
				<TouchableOpacity onPress={() => move('profile-page')}>
					<View style={styles.avatarArea}>
						{user.avatar !== '' && (
							<Image
								style={styles.avatar}
								source={{
									uri: `${URL}${user.avatar}`,
								}}
							/>
						)}
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.searchArea}>
				<InputArea
					Style={{ width: 260 }}
					Value={search}
					Title={''}
					ErrorMsg={'Invalid login'}
					ErrorStatus={false}
					ChangeValue={(value: string) => {
						setSearch(value);
					}}
				/>
				<TouchableOpacity style={styles.settingBtn}>
					<FilterSettingsIcon
						width={40}
						height={40}
						style={styles.settingIcon}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.navigationArea}>
				<FlatList
					data={typesArr}
					horizontal={true}
					renderItem={({ item }) => {
						return (
							<NavigationButton
								item={item}
								activeType={activeType}
								onPressFunc={(item: string) => {
									setCurrentPage(1);
									setRecipeList([]);
									setActiveType(item.toLowerCase());
								}}
							/>
						);
					}}
					keyExtractor={(item: string, id: number) => id.toString()}
				/>
			</View>
			<View style={styles.recipeArea}>
				<FlatList
					numColumns={2}
					data={recipeList}
					onEndReachedThreshold={0}
					onEndReached={loadMoreItem}
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
			<View style={styles.addRecipeBtn}>
				<TouchableOpacity
					onPress={() => {
						move('create');
						dispatch(changeRecipeForm({ value: user.id, key: 'authorId' }));
						dispatch(
							changeRecipeForm({ value: user.login, key: 'authorLogin' })
						);
					}}>
					<AddButtonIcon width={55} height={55} />
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 17,
		color: '#A9A9A9',
	},
	title: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	header: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	avatar: {
		width: 35,
		height: 35,
		borderRadius: 1000,
	},
	container: {
		flex: 1,
		marginTop: 25,
		paddingTop: 20,
		paddingHorizontal: 30,
	},
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
	headerText: {},
	recipeArea: {
		height: 460,
		paddingVertical: 10,
		alignItems: 'center',
	},
	avatarArea: {
		width: 40,
		height: 40,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFCE80',
	},
	searchArea: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	settingBtn: {
		marginTop: 35,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#129575',
	},
	settingIcon: {},
	addRecipeBtn: {
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
	},
	navigationArea: {
		marginTop: 10,
		flexDirection: 'row',
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
