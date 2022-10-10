import { StatusBar } from 'expo-status-bar';
import { UserFormRootState } from '../../redux';
import React, { useEffect, useState } from 'react';
import userAPIActions from '../../api-actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { UserFormIErrorSignIn } from '../../types/user';
import { showMessage } from 'react-native-flash-message';
import InputArea from '../reusable-components/InputArea';
import SubmitButton from '../reusable-components/SubmitButton';
import emailValidation from '../../extra-functions/email-validation';
import regularValidation from '../../extra-functions/regular-validation';
import { changeUserForm, reseteUserForm, changeUser } from '../../redux';
import { StyleSheet, View, Text, Pressable, SafeAreaView } from 'react-native';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../extra-functions/flash-message';

interface PropsI {
	navigation: any;
}

export default function SignIn({navigation}: PropsI) {
	const dispatch = useDispatch();
	const user = useSelector((store: UserFormRootState) => store.userForm);
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const [error, setError] = useState<UserFormIErrorSignIn>({email: null, password: null});
	
	useEffect((): void => {
		setButtonStatus(Object.values(error).every((el: boolean) => el === false));
	}, [error]);

	const buttonAction = async (): Promise<void> => {
		try {
			const {data, status} = await userAPIActions.signInUser({email: user.email, password: user.password});
			if(status === 200) {
				showMessage({
					duration: 5000,
					type: getTypeForFlashMsg(status),
					message: getMessageForFlashMsg(status),
					description: 'Authorisation went successful',
				});
				dispatch(changeUser({value: data, key: 'id'}));
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

	const refreshFunc = (): void => {
		setButtonStatus(false);
		setError({email: null, password: null});
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
					ChangeValue={(value: string) => {
						dispatch(changeUserForm({value, key: 'password'}));
						setError({...error, password: regularValidation(value)});
					}}
				/>
				<Text style={[styles.link, {marginTop: 10, fontSize: 14}]}>Forgot Password?</Text>
			</View>
			<SubmitButton
				Title={'Sign In'}
				Style={styles.button}
				Status={!buttonStatus}
				onPressFunc={buttonAction}
			/>
			<View style={[styles.linkArea, {marginTop: 20}]}>
				<Text style={{fontSize: 14}}>Don’t have an account?</Text>
				<Pressable style={{marginLeft: 10}} onPress={() => navigateLinkFunc('sign-up')}>
					<Text style={styles.link}>Sign up</Text>
				</Pressable>
			</View>
			<StatusBar style="auto" />
		</SafeAreaView>
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
	linkArea: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	link: {
		color: '#FF9C00',
	},
	button: {
		marginTop: 50,
	}
});