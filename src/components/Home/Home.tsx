import { URL } from '../../../config';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import userAPIActions from '../../api-actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import InputArea from '../reusable-components/InputArea';
import AddIcon from '../../../assets/icons/add-button.svg';
import { changeUser, UserRootState, setUser } from '../../redux';
import FilterSettingsIcon from '../../../assets/icons/filter-setting.svg';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../extra-functions/flash-message';

interface PropsI {
	navigation: any;
}

const typesArr = ['All', 'Appetizers', 'Salads', 'Soups', 'Main', 'Desserts'];

export default function Home({navigation}: PropsI) {
	const dispatch = useDispatch();
	const [search, setSearch] = useState<string>('');
	const user: any = useSelector((store: UserRootState) => store.user);

	useEffect((): void => {
		getUserInf();
	}, [user.id]);

	const move = (): void => {
		navigation.navigate('profile-page');
	};

	const addRecipe = (): void => {
		navigation.navigate('profile-page');
	};

	const renderItem = ({ item }: any) => {
		return(
			<TouchableOpacity style={styles.recipesBtn}>
				<Text style={styles.recipesBtnTitle}>{item}</Text>
			</TouchableOpacity>
		);
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

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerText}>
					<Text style={styles.title}>Hello {user.login}</Text>
					<Text style={styles.text}>What are you cooking today?</Text>
				</View>
				<TouchableOpacity onPress={move}>
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
					renderItem={renderItem}
					keyExtractor={(item: string, id: number) => id.toString()}
				/>
			</View>
			<View style={styles.addRecipeBtn}>
				<TouchableOpacity onPress={addRecipe}>
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
		top: 475,
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
		backgroundColor: '#129575',
	},
	recipesBtnTitle: {
		color: 'white',
	},
});