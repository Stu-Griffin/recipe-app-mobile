import { RootState } from '../redux';
import { UserFormIError, UserFormI } from '../types/user';
import { changeUserForm } from '../redux';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import InputArea from './reusable-components/InputArea';
import SubmitButton from './reusable-components/SubmitButton';
import emailValidation from '../extra-functions/email-validation';
import regularValidation from '../extra-functions/regular-validation';

export default function SignIn() {
	const dispatch = useDispatch();
	const user: UserFormI = useSelector((store: RootState) => store);
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const [error, setError] = useState<UserFormIError>({email: null, password: null});
	
	useEffect((): void => {
		setButtonStatus(Object.values(error).every((el: boolean) => el === false));
	}, [error]);

	const buttonAction = (): void => {
		console.log('sign in');
	};

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>Hello,</Text>
				<Text style={styles.text}>Welcome Back!</Text>
			</View>
			<View style={styles.form}>
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
				{/* <Text style={[styles.link, {marginTop: 10, fontSize: 14}]}>Forgot Password?</Text> */}
			</View>
			<SubmitButton
				Title={'Sign In'}
				Style={styles.button}
				Status={!buttonStatus}
				onPressFunc={buttonAction}
			/>
			<Text style={{marginTop: 20, fontSize: 14}}>Don’t have an account?  <Text style={styles.link}>Sign up</Text></Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 100,
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
	link: {
		color: '#FF9C00',
	},
	button: {
		marginTop: 50,
	}
});