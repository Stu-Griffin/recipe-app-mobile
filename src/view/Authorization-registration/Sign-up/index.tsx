import Checkbox from 'expo-checkbox';
import { StatusBar } from 'expo-status-bar';
import { AppDispatch, RootState } from '../../../types/redux';
import React, { useEffect, useState } from 'react';
import userAPIActions from '../../../controller/api/user';
import { useDispatch, useSelector } from 'react-redux';
import { UserFormIErrorSignUp } from '../../../types/user';
import InputArea from '../../Reusable/InputArea';
import { showMessage } from 'react-native-flash-message';
import { changeUserForm, reseteUserForm } from '../../../redux/user';
import SubmitButton from '../../Reusable/SubmitButton';
import { emailValidation, regularValidation } from '../../../controller/validation';
import { StyleSheet, View, Text, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../../controller/flash-message';
import { NavigationI } from '../../../types/navigation';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
	const dispatch: AppDispatch = useDispatch();
	const navigation: NavigationI = useNavigation();
	const [error, setError] = useState<UserFormIErrorSignUp>({
		email: null,
		password: null,
		login: null,
		confirmPassword: null,
	});
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const user = useSelector((store: RootState) => store.userForm);

	useEffect((): void => {
		setButtonStatus(
			Object.values(error).every((el: boolean) => el === false) &&
        user.conditionAndTermsStatus
		);
	}, [error, user.conditionAndTermsStatus]);

	const refreshFunc = (): void => {
		setButtonStatus(false);
		setError({
			email: null,
			password: null,
			login: null,
			confirmPassword: null,
		});
	};

	const checkBoxFunc = (value: boolean): void => {
		dispatch(changeUserForm({ value, key: 'conditionAndTermsStatus' }));
	};

	const buttonAction = async (): Promise<void> => {
		try {
			const { data, status } = await userAPIActions.signUpUser({
				email: user.email,
				password: user.password,
				login: user.login,
			});
			console.log(data, status);
			showMessage({
				duration: 5000,
				description: data,
				type: getTypeForFlashMsg(status),
				message: getMessageForFlashMsg(status),
			});
			if (status === 200) {
				navigateLinkFunc('sign-in');
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
				<Text style={styles.title}>Create an account</Text>
				<Text style={styles.text}>
          Let’s help you set up your account, it won’t take long.
				</Text>
			</View>
			<ScrollView style={{ marginTop: 10 }}>
				<InputArea
					Style={{}}
					Value={user.login}
					Title={'Enter Login'}
					ErrorMsg={'Invalid login'}
					ErrorStatus={false}
					ChangeValue={(value: string): void => {
						dispatch(changeUserForm({ value, key: 'login' }));
						setError({ ...error, login: regularValidation(value) });
					}}
				/>
				<InputArea
					Style={{}}
					Value={user.email}
					Title={'Enter Email'}
					ErrorMsg={'Invalid email'}
					ErrorStatus={error.email}
					ChangeValue={(value: string): void => {
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
					ChangeValue={(value: string): void => {
						dispatch(changeUserForm({ value, key: 'password' }));
						setError({ ...error, password: regularValidation(value) });
					}}
				/>
				<InputArea
					Style={{}}
					Value={user.confirmPassword}
					Title={'Confirm Password'}
					ErrorMsg={'Invalid Password'}
					ErrorStatus={error.confirmPassword}
					ChangeValue={(value: string): void => {
						dispatch(changeUserForm({ value, key: 'confirmPassword' }));
						setError({ ...error, confirmPassword: regularValidation(value) });
					}}
				/>
				<View style={styles.linkArea}>
					<Checkbox
						color={'#FF9C00'}
						style={styles.checkbox}
						value={user.conditionAndTermsStatus}
						onValueChange={checkBoxFunc}
					/>
					<Text style={styles.link}>Accept terms & Condition</Text>
				</View>
				<SubmitButton
					Title={'Sign Up'}
					Style={styles.button}
					Status={!buttonStatus}
					onPressFunc={buttonAction}
				/>
				<View style={[styles.linkArea, { marginTop: 20 }]}>
					<Text style={{ fontSize: 14 }}>Already a member?</Text>
					<Pressable onPress={() => navigateLinkFunc('sign-in')}>
						<Text style={styles.link}>Sign In</Text>
					</Pressable>
				</View>
			</ScrollView>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 20,
	},
	link: {
		marginLeft: 10,
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
	checkbox: {
		borderRadius: 5,
	},
	container: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 30,
	},
});
