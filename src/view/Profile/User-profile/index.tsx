import { URL } from '../../../../config';
import { useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { RootState } from '../../../types/redux';
import * as ImagePicker from 'expo-image-picker';
import InputArea from '../../Reusable/InputArea';
import React, { useEffect, useState } from 'react';
import { ImagePickerI } from '../../../types/reusable';
import SubmitButton from '../../Reusable/SubmitButton';
import { NavigationI } from '../../../types/navigation';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import userAPIActions from '../../../controller/api/user';
import AddButton from '../../../../assets/icons/add-button';
import ArrowLeftIcon from '../../../../assets/icons/arrow-left';
import { emailValidation, regularValidation } from '../../../controller/validation';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../../controller/flash-message';
import { StyleSheet, View, Image, Text, Pressable, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

interface AvatarBufferI {
  uri: string;
  type: string;
  name: string;
  fileName: string;
}

export default function Profile() {
	const [error, setError] = useState({
		login: false,
		email: false,
		password: false,
	});
	const newUser: FormData = new FormData();
	const navigation: NavigationI = useNavigation();
	const [avatarBuffer, setAvatarBuffer] = useState<AvatarBufferI>();
	const { avatar, id } = useSelector((store: RootState) => store.user);
	const [user, setUser] = useState({ login: '', email: '', password: '' });
	const [avatarUri, setAvatarUri] = useState<string>(`${URL}assets/avatars/avatar.png`);

	useEffect((): void => {
		setAvatarUri(`${URL}${avatar}`);
	}, [avatar]);

	const move = (): void => {
		navigation.navigate('home');
	};

	const refresh = (): void => {
		setUser({ login: '', email: '', password: '' });
		setError({ login: false, email: false, password: false });
	};

	const createNewUserFormData = (): void => {
		const errorStatus = emailValidation(user.email);
		if (!errorStatus) {
			newUser.append('email', user.email);
			setError({ ...error, email: errorStatus });
		}
		if (user.login !== '') newUser.append('login', user.login);
		if (user.password !== '') newUser.append('password', user.password);
		if (
			avatarUri.split('/').reverse()[0].split('.')[0] !==
      avatar.split('/').reverse()[0].split('.')[0]
		)
			newUser.append('avatar', JSON.stringify(avatarBuffer));
	};

	const pickImage = async (): Promise<void> => {
		const { uri, cancelled }: ImagePickerI = await ImagePicker.launchImageLibraryAsync({
			quality: 1,
			aspect: [4, 3],
			allowsEditing: true,
			mediaTypes: ImagePicker.MediaTypeOptions.All,
		});
		if(uri) {
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
		}
	};

	const buttonAction = async (): Promise<void> => {
		createNewUserFormData();
		try {
			const response = await userAPIActions.changeUser(id, newUser);
			console.log(response);
			showMessage({
				duration: 5000,
				description: response.data,
				type: getTypeForFlashMsg(response.status),
				message: getMessageForFlashMsg(response.status),
			});
		} catch (error) {
			console.log(error);
		}
		refresh();
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.pageTitleArea}>
				<TouchableOpacity style={styles.goBackIcon} onPress={move}>
					<ArrowLeftIcon />
				</TouchableOpacity>
				<Text style={styles.pageTitle}>Profile</Text>
			</View>
			<View style={styles.avatarArea}>
				<Image style={styles.avatar} source={{ uri: avatarUri }} />
				<Pressable onPress={pickImage}>
					<AddButton width={30} height={30} style={styles.addIcon} />
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
						setUser({ ...user, login: value });
						setError({ ...error, email: regularValidation(value) });
					}}
				/>
				<InputArea
					Style={{}}
					Value={user.email}
					Title={'Change Email'}
					ErrorMsg={'Invalid email'}
					ErrorStatus={error.email}
					ChangeValue={(value: string) => {
						setUser({ ...user, email: value });
						setError({ ...error, email: emailValidation(value) });
					}}
				/>
				<InputArea
					Style={{}}
					Value={user.password}
					Title={'Change Password'}
					ErrorMsg={'Invalid password'}
					ErrorStatus={error.password}
					ChangeValue={(value: string) => {
						setUser({ ...user, password: value });
						setError({ ...error, email: regularValidation(value) });
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
	form: {
		marginTop: 10,
	},
	avatar: {
		width: 200,
		height: 200,
		borderRadius: 100,
	},
	button: {
		width: '100%',
		marginTop: 25,
		marginBottom: 50,
	},
	addIcon: {
		top: -30,
		left: 30,
		position: 'absolute',
	},
	container: {
		flex: 1,
		marginTop: 25,
		paddingHorizontal: 30,
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
	goBackIcon: {
		top: 30,
		left: 0,
		position: 'absolute',
	},
	pageTitleArea: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
