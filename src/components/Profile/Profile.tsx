import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import InputArea from '../reusable-components/InputArea';
import { changeUserForm, UserRootState } from '../../redux';
import AddButton from '../../../assets/icons/add-button.svg';
import SubmitButton from '../reusable-components/SubmitButton';
import ArrowLeftIcon from '../../../assets/icons/arrow-left.svg';
import emailValidation from '../../extra-functions/email-validation';
import regularValidation from '../../extra-functions/regular-validation';
import { StyleSheet, View, Image, Text, Pressable, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

interface PropsI {
	navigation: any;
}

export default function Profile({navigation}: PropsI) {
	const dispatch = useDispatch();
	const { avatar } = useSelector((store: UserRootState) => store.user);
	const [user, setUser] = useState({login: '', email: '', password: ''});
	const [error, setError] = useState({login: false, email: false, password: false});
	
	const move = () => {
		navigation.navigate('home');
	};

	const buttonAction = () => {
		console.log('change user', user);
	};

	const changeAvatar = () => {
		console.log('img');
	};
	
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.pageTitleArea}>
				<TouchableOpacity onPress={move}>
					<ArrowLeftIcon style={styles.goBackIcon} width={30} height={30}/>
				</TouchableOpacity>
				<Text style={styles.pageTitle}>Profile</Text>
			</View>
			<View style={styles.avatarArea}>
				<Image
					style={styles.avatar}
					source={{
						uri: 'data:image/jpeg;base64,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',
					}}
				/>
				<Pressable onPress={changeAvatar}>
					<AddButton width={40} height={40} style={styles.addIcon}/>
				</Pressable>
			</View>
			<ScrollView style={styles.form}>
				<InputArea
					Style={{}}
					Value={user.login}
					Title={'Change Login'}
					ErrorMsg={'Invalid login'}
					ErrorStatus={error.login}
					ChangeValue={(value: string) => {
						setUser({...user, login: value});
						setError({...error, email: regularValidation(value)});
					}}
				/>
				<InputArea
					Style={{}}
					Value={user.email}
					Title={'Change Email'}
					ErrorMsg={'Invalid email'}
					ErrorStatus={error.email}
					ChangeValue={(value: string) => {
						setUser({...user, email: value});
						setError({...error, email: emailValidation(value)});
					}}
				/>
				<InputArea
					Style={{}}
					Value={user.password}
					Title={'Change Password'}
					ErrorMsg={'Invalid password'}
					ErrorStatus={error.password}
					ChangeValue={(value: string) => {
						setUser({...user, password: value});
						setError({...error, email: regularValidation(value)});
					}}
				/>
				<SubmitButton
					Title={'Commit changes'}
					Style={styles.button}
					Status={false}
					onPressFunc={buttonAction}
				/>
			</ScrollView>
			<StatusBar style="auto" />
		</SafeAreaView>
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
	avatarArea: {
		marginTop: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	form: {
		marginTop: 10
	},
	avatar: {
		width: 200,
		height: 200,
		borderRadius: 100,
	},
	container: {
		flex: 1,
		marginTop: 25,
		paddingHorizontal: 30,
	},
	button: {
		width: '100%',
		marginTop: 25,
		marginBottom: 50
	},
	addIcon: {
		top: -30,
		left: 30,
		position: 'absolute',
	},
	goBackIcon: {
		left: -100,
		position: 'absolute',
	}
});