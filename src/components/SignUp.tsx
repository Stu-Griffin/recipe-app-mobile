import Checkbox from 'expo-checkbox';
import { RootState } from '../redux';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { UserFormIErrorSignUp } from '../types/user';
import { useDispatch, useSelector } from 'react-redux';
import InputArea from './reusable-components/InputArea';
import { changeUserForm, reseteUserForm } from '../redux';
import SubmitButton from './reusable-components/SubmitButton';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import emailValidation from '../extra-functions/email-validation';
import regularValidation from '../extra-functions/regular-validation';

interface PropsI {
	navigation: any;
}

export default function SignUp({navigation}: PropsI) {
	const dispatch = useDispatch();
	const user = useSelector((store: RootState) => store.user);
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const [error, setError] = useState<UserFormIErrorSignUp>({email: null, password: null, login: null, confirmPassword: null});
	
	useEffect((): void => {
		setButtonStatus((Object.values(error).every((el: boolean) => el === false)) && user.conditionAndTermsStatus);
	}, [error, user.conditionAndTermsStatus]);

	const buttonAction = (): void => {
		console.log('sign up');
	};

	const checkBoxFunc = (value: boolean): void => {
		dispatch(changeUserForm({value, key: 'conditionAndTermsStatus'}));
	};

	const refreshFunc = (): void => {
		setButtonStatus(false);
		setError({email: null, password: null, login: null, confirmPassword: null});
	};

	const navigateLinkFunc = (): void => {
		refreshFunc();
		dispatch(reseteUserForm());
		navigation.navigate('sign-in');
	};

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Create an account</Text>
				<Text style={styles.text}>Let’s help you set up your account, it won’t take long.</Text>
			</View>
			<View style={styles.form}>
				<InputArea
					Style={{}}
					Value={user.login}
					Title={'Enter Login'}
					ErrorMsg={'Invalid login'}
					ErrorStatus={false}
					ChangeValue={(value: string): void => {
						dispatch(changeUserForm({value, key: 'login'}));
						setError({...error, login: regularValidation(value)});
					}}
				/>
				<InputArea
					Style={{}}
					Value={user.email}
					Title={'Enter Email'}
					ErrorMsg={'Invalid email'}
					ErrorStatus={error.email}
					ChangeValue={(value: string): void => {
						dispatch(changeUserForm({value, key: 'email'}));
						setError({...error, email: emailValidation(value)});
					}}
				/>
				<InputArea
					Style={{}}
					Value={user.password}
					Title={'Enter Password'}
					ErrorMsg={'Invalid Password'}
					ErrorStatus={error.password}
					ChangeValue={(value: string): void => {
						dispatch(changeUserForm({value, key: 'password'}));
						setError({...error, password: regularValidation(value)});
					}}
				/>
				<InputArea
					Style={{}}
					Value={user.confirmPassword}
					Title={'Confirm Password'}
					ErrorMsg={'Invalid Password'}
					ErrorStatus={error.confirmPassword}
					ChangeValue={(value: string): void => {
						dispatch(changeUserForm({value, key: 'confirmPassword'}));
						setError({...error, confirmPassword: regularValidation(value)});
					}}
				/>
				<View style={styles.linkArea}>
					<Checkbox color={'#FF9C00'} style={styles.checkbox} value={user.conditionAndTermsStatus} onValueChange={checkBoxFunc} />
					<Text style={styles.link}>Accept terms & Condition</Text>
				</View>
			</View>
			<SubmitButton
				Title={'Sign In'}
				Style={styles.button}
				Status={!buttonStatus}
				onPressFunc={buttonAction}
			/>
			<View style={[styles.linkArea, {marginTop: 20}]}>
				<Text style={{fontSize: 14}}>Already a member?</Text>
				<Pressable onPress={navigateLinkFunc}>
					<Text style={styles.link}>Sign Up</Text>
				</Pressable>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		paddingHorizontal: 30,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
	},
	text: {
		fontSize: 20,
	},
	form: {
		marginTop: 50,
		justifyContent: 'space-around',
	},
	linkArea: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	checkbox: {
		borderRadius: 5
	},
	link: {
		marginLeft: 10,
		color: '#FF9C00',
	},
	button: {
		marginTop: 50,
	}
});