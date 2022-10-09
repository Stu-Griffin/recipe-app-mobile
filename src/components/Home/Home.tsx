import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserForm, RootState } from '../../redux';
import InputArea from '../reusable-components/InputArea';
import FilterSettingsIcon from '../../../assets/icons/filter-setting.svg';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';

interface PropsI {
	navigation: any;
}

const typesArr = ['All', 'Appetizers', 'Salads', 'Soups', 'Main', 'Desserts'];

export default function Home({navigation}: PropsI) {
	const dispatch = useDispatch();
	const [search, setSearch] = useState('');
	const user = useSelector((store: RootState) => store.user);

	const renderItem = ({ item }) => {
		return(
			<TouchableOpacity style={styles.recipesBtn}>
				<Text style={styles.recipesBtnTitle}>{item}</Text>
			</TouchableOpacity>
		);
	};

	const move = () => {
		navigation.navigate('profile-page');
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerText}>
					<Text style={styles.title}>Hello {user.login}</Text>
					<Text style={styles.text}>What are you cooking today?</Text>
				</View>
				<TouchableOpacity onPress={move}>
					<View style={styles.avatarArea}></View>
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