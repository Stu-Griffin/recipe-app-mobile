import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import userAPIActions from '../../../controller/api/user';
import { useDispatch, useSelector } from 'react-redux';
import { UserFormIErrorSignIn } from '../../../types/user';
import { showMessage } from 'react-native-flash-message';
import InputArea from '../../Reusable/InputArea';
import SubmitButton from '../../Reusable/SubmitButton';
import { emailValidation, regularValidation } from '../../../controller/validation';
import { StyleSheet, View, Text, Pressable, SafeAreaView } from 'react-native';
import { changeUserForm, reseteUserForm, changeUser } from '../../../redux/user';
import { AppDispatch, RootState } from '../../../types/redux';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../../controller/flash-message';
import { useNavigation } from '@react-navigation/native';
import { NavigationI } from '../../../types/navigation';

export default function SignIn() {
	const dispatch: AppDispatch = useDispatch();
	const navigation: NavigationI = useNavigation();
	const [error, setError] = useState<UserFormIErrorSignIn>({
		email: null,
		password: null,
	});
	const user = useSelector((store: RootState) => store.userForm);
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);

	useEffect((): void => {
		setButtonStatus(Object.values(error).every((el: boolean) => el === false));
	}, [error]);

	const refreshFunc = (): void => {
		setButtonStatus(false);
		setError({ email: null, password: null });
	};

	const buttonAction = async (): Promise<void> => {
		try {
			const { data, status } = await userAPIActions.signInUser({
				email: user.email,
				password: user.password,
			});
			if (status === 200) {
				showMessage({
					duration: 5000,
					type: getTypeForFlashMsg(status),
					message: getMessageForFlashMsg(status),
					description: 'Authorisation went successful',
				});
				dispatch(changeUser({ value: data, key: 'id' }));
				navigateLinkFunc('home-page');
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

	const navigateLinkFunc = (route: string): void => {
		refreshFunc();
		dispatch(reseteUserForm());
		navigation.navigate(route);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View>
				<Text style={styles.title}>Hello,</Text>
				<Text style={styles.text}>Welcome Back!</Text>
			</View>
			<View style={styles.form}>
				<InputArea
					Style={{}}
					Value={user.email}
					Title={'Enter Email'}
					ErrorMsg={'Invalid email'}
					ErrorStatus={error.email}
					ChangeValue={(value: string) => {
						dispatch(changeUserForm({ value, key: 'email' }));
						setError({ ...error, email: emailValidation(value) });
					}}
				/>
				<InputArea
					Style={{}}
					Value={user.password}
					Title={'Enter Password'}
					ErrorMsg={'Invalid Password'}
					ErrorStatus={error.password}
					ChangeValue={(value: string) => {
						dispatch(changeUserForm({ value, key: 'password' }));
						setError({ ...error, password: regularValidation(value) });
					}}
				/>
				<Text style={[styles.link, { marginTop: 10, fontSize: 14 }]}>
          Forgot Password?
				</Text>
			</View>
			<SubmitButton
				Title={'Sign In'}
				Style={styles.button}
				Status={!buttonStatus}
				onPressFunc={buttonAction}
			/>
			<View style={[styles.linkArea, { marginTop: 20 }]}>
				<Text style={{ fontSize: 14 }}>Don’t have an account?</Text>
				<Pressable
					style={{ marginLeft: 10 }}
					onPress={() => navigateLinkFunc('sign-up')}>
					<Text style={styles.link}>Sign up</Text>
				</Pressable>
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 20,
	},
	form: {
		marginTop: 50,
		justifyContent: 'space-around',
	},
	link: {
		color: '#FF9C00',
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	button: {
		marginTop: 50,
	},
	linkArea: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	container: {
		flex: 1,
		paddingTop: 100,
		paddingHorizontal: 30,
	},
});
