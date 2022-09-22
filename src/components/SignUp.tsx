import Checkbox from 'expo-checkbox';
import { RootState } from '../redux';
import { changeUserForm } from '../redux';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import InputArea from './reusable-components/InputArea';
import SubmitButton from './reusable-components/SubmitButton';
import { UserFormIErrorSignUp, UserFormI } from '../types/user';
import emailValidation from '../extra-functions/email-validation';
import regularValidation from '../extra-functions/regular-validation';

export default function SignUp() {
	const dispatch = useDispatch();
	const user: UserFormI = useSelector((store: RootState) => store);
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

	const refreshFunc = () => {
		setError({email: null, password: null, login: null, confirmPassword: null});
		setButtonStatus(false);
	};

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Create an account</Text>
				<Text style={styles.text}>Let’s help you set up your account, it won’t take long.</Text>
			</View>
			<View style={styles.form}>
				<InputArea
					Value={user.login}
					Title={'Enter Login'}
					ErrorMsg={'Invalid login'}
					ErrorStatus={false}
					ChangeValue={(value: string) => {
						dispatch(changeUserForm({value, key: 'login'}));
						setError({...error, login: regularValidation(value)});
					}}
				/>
				<InputArea
					Value={user.email}
					Title={'Enter Email'}
					ErrorMsg={'Invalid email'}
					ErrorStatus={error.email}
					ChangeValue={(value: string) => {
						dispatch(changeUserForm({value, key: 'email'}));
						setError({...error, email: emailValidation(value)});
					}}
				/>
				<InputArea
					Value={user.password}
					Title={'Enter Password'}
					ErrorMsg={'Invalid Password'}
					ErrorStatus={error.password}
					ChangeValue={(value: string) => {
						dispatch(changeUserForm({value, key: 'password'}));
						setError({...error, password: regularValidation(value)});
					}}
				/>
				<InputArea
					Value={user.confirmPassword}
					Title={'Confirm Password'}
					ErrorMsg={'Invalid Password'}
					ErrorStatus={error.confirmPassword}
					ChangeValue={(value: string) => {
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
				<Text style={styles.link}>Sign In</Text>
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