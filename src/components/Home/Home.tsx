import { URL } from '../../../config';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import userAPIActions from '../../api-actions/user';
import { LinearGradient } from 'expo-linear-gradient';
import StarIcon from '../../../assets/icons/star.svg';
import { useDispatch, useSelector } from 'react-redux';
import recipeAPIActions from '../../api-actions/recipe';
import { showMessage } from 'react-native-flash-message';
import InputArea from '../reusable-components/InputArea';
import AddIcon from '../../../assets/icons/add-button.svg';
import FilterSettingsIcon from '../../../assets/icons/filter-setting.svg';
import { UserRootState, setUser, getRecipeForm, changeRecipeForm } from '../../redux';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../extra-functions/flash-message';

interface PropsI {
	navigation: any;
}

const typesArr = ['Appetizers', 'Salads', 'Soups', 'Main', 'Desserts'];

export default function Home({navigation}: PropsI) {
	const dispatch = useDispatch();
	const [search, setSearch] = useState<string>('');
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [recipeList, setRecipeList] = useState<Array<any>>([]);
	const user: any = useSelector((store: UserRootState) => store.user);
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
		setCurrentPage(1);
		setRecipeList([]);
		setActiveType(typesArr[0].toLocaleLowerCase());
		navigation.navigate(route);
	};

	const getUserInf = async (): Promise<void> => {
		try {
			const {data, status} = await userAPIActions.getUser(user.id || '6343c69dab75c7cd862d045b');
			if(status === 200) {
				dispatch(setUser({
					id: data['_id'],
					login: data?.login,
					email: data?.email,
					avatar: data?.avatar,
				}));
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
			const { data } = await recipeAPIActions.getAllRecipes(activeType, currentPage.toString());
			setRecipeList([...recipeList, ...data]);
			// setRecipeList(data);
		} catch (error) {
			console.log(error);
		}
	};

	const renderRecipeItem = ({ item }: any) => {
		return(
			<TouchableOpacity onPress={() => {
				move('edit');
				dispatch(getRecipeForm(item));
			}} style={styles.recipesBlockArea}>
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
	};

	const renderNavigationItem = ({ item }: any) => {
		return(
			<TouchableOpacity onPress={() => {
				setCurrentPage(1);
				setRecipeList([]);
				setActiveType(item.toLowerCase());
			}} style={[styles.recipesBtn, (item.toLocaleLowerCase() === activeType) && styles.activeRecipesBtn]}>
				<Text style={(item.toLocaleLowerCase() === activeType) ? styles.activeRecipesBtnTitle : styles.unActiveRecipesBtnTitle}>{item}</Text>
			</TouchableOpacity>
		);
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
						{
							(user.avatar !== '') &&
							<Image
								style={styles.avatar}
								source={{
									uri: `${URL}${user.avatar}`,
								}}
							/>
						}
					</View>
				</TouchableOpacity>
			</View>
			<View style={styles.searchArea}>
				<InputArea
					Style={{width: 260}}
					Value={search}
					Title={''}
					ErrorMsg={'Invalid login'}
					ErrorStatus={false}
					ChangeValue={(value: string) => {
						setSearch(value);
					}}
				/>
				<TouchableOpacity style={styles.settingBtn}>
					<FilterSettingsIcon width={40} height={40} style={styles.settingIcon} />
				</TouchableOpacity>
			</View>
			<View style={styles.navigationArea}>
				<FlatList
					data={typesArr}
					horizontal={true}
					renderItem={renderNavigationItem}
					keyExtractor={(item: string, id: number) => id.toString()}
				/>
			</View>
			<View style={styles.recipeArea}>
				<FlatList
					numColumns={2}
					data={recipeList}
					onEndReachedThreshold={0}
					onEndReached={loadMoreItem}
					renderItem={renderRecipeItem}
					keyExtractor={(item: any) => item['_id']}
				/>
			</View>
			<View style={styles.addRecipeBtn}>
				<TouchableOpacity onPress={() => {
					move('create');
					dispatch(changeRecipeForm({value: user.id, key: 'authorId'}));
					dispatch(changeRecipeForm({value: user.login, key: 'authorLogin'}));
				}}>
					<AddIcon width={55} height={55}/>
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 25,
		paddingTop: 20,
		paddingHorizontal: 30,
	},
	header: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerText: {

	},
	recipeArea: {
		height: 460,
		paddingVertical: 10,
		alignItems: 'center',
	},
	recipesBlockArea: {
		width: 150,
		height: 150,
		marginVertical: 10,
		marginHorizontal: 5,
	},
	linearGradient: {
		width: 150,
		height: 150,
		paddingVertical: 15,
		paddingHorizontal: 15,
		justifyContent: 'space-between'
	},
	recipesBlock: {
		width: 150,
		height: 150,
	},
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
	title: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	text: {
		fontSize: 17,
		color: '#A9A9A9',
	},
	avatarArea: {
		width: 40,
		height: 40,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FFCE80',
	},
	addRecipeBtn: {
		top: 20,
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		width: 35,
		height: 35,
		borderRadius: 1000
	},
	searchArea: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	settingBtn: {
		marginTop: 35,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#129575',
	},
	settingIcon: {

	},
	navigationArea: {
		marginTop: 10,
		flexDirection: 'row',
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
	activeRecipesBtn: {
		backgroundColor: '#129575',
	},
	unActiveRecipesBtnTitle: {
		color: '#71B1A1',
	},
	activeRecipesBtnTitle: {
		color: 'white',
	},
});