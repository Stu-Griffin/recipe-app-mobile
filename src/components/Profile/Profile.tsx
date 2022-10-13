import { URL } from '../../../config';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import userAPIActions from '../../api-actions/user';
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

interface AvatarBufferI {
	uri: string;
	type: string;
	name: string;
	fileName: string;
}

export default function Profile({navigation}: PropsI) {
	const dispatch = useDispatch();
	const newUser: any = new FormData();
	const [avatarBuffer, setAvatarBuffer] = useState<AvatarBufferI>();
	const [user, setUser] = useState({login: '', email: '', password: ''});
	const { avatar, id } = useSelector((store: UserRootState) => store.user);
	const [error, setError] = useState({login: false, email: false, password: false});
	const [avatarUri, setAvatarUri] = useState<string>(`${URL}assets/avatars/avatar.png`);

	useEffect((): void => {
		setAvatarUri(`${URL}${avatar}`);
	}, [avatar]);

	const move = (): void => {
		navigation.navigate('home');
	};

	const createNewUserFormData = (): void => {
		const errorStatus = emailValidation(user.email);
		if(!errorStatus) {
			newUser.append('email', user.email);
			setError({...error, email: errorStatus});
		}
		if(user.login !== '') newUser.append('login', user.login);
		if(user.password !== '') newUser.append('password', user.password);
		if(avatarUri.split('/').reverse()[0].split('.')[0] !== avatar.split('/').reverse()[0].split('.')[0]) newUser.append('avatar', avatarBuffer);
	};

	const buttonAction = async (): Promise<void> => {
		createNewUserFormData();
		try {
			const response = await userAPIActions.changeUser(id, newUser);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
		refresh();
	};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const { uri, cancelled }: any = await ImagePicker.launchImageLibraryAsync({
			quality: 1,
			aspect: [4, 3],
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.All,
		});
		const imageExtension: string = uri.split('.').reverse()[0];
		if (!cancelled) {
			setAvatarBuffer({
				uri: uri,
				fileName: 'image',
				type: `image/${imageExtension}`,
				name: `avatar.${imageExtension}`,
			});
			setAvatarUri(uri);
		}
	};

	const refresh = ():void => {
		setUser({login: '', email: '', password: ''});
		setError({login: false, email: false, password: false});
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
				<Image style={styles.avatar} source={{ uri: avatarUri}}/>
				<Pressable onPress={pickImage}>
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