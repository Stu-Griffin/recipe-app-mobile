import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="sign-in">
				<Stack.Screen name="sign-in" component={SignIn} />
				<Stack.Screen name="sign-up" component={SignUp} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}