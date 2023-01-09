import React from 'react';
import Home from './Home';
import Recipe from './Recipe';
import Edit from './Edit-recipe';
import Create from './Create-recipe';
import Profile from './Profile/User-profile';
import ListIcon from '../../assets/icons/list';
import ProfileIcon from '../../assets/icons/profile';
import AuthoreRecepies from './Profile/Users-recepies';
import SignIn from './Authorization-registration/Sign-in';
import SignUp from './Authorization-registration/Sign-up';
import ActiveListIcon from '../../assets/icons/active-list';
import { NavigationContainer } from '@react-navigation/native';
import ActiveProfileIcon from '../../assets/icons/active-profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const profilenavigationScreenOptions = ({ route }: any) => {
	return ({
		headerShown: false,
		tabBarLabel: () => null,
		tabBarActiveTintColor: 'pink',
		tabBarInactiveTintColor: 'gray',
		tabBarIcon: ({ focused, size }: any) => {
			switch (route.name) {
			case 'profile':
				return focused ? (<ActiveProfileIcon size={size} />) : (<ProfileIcon size={size} />);
			case 'authore-recepies':
				return focused ? (<ActiveListIcon size={size} />) : (<ListIcon size={size} />);
			}
		},
	});
};

function ProfileNavigation() {
	return (
		<Tab.Navigator initialRouteName="profile" screenOptions={profilenavigationScreenOptions}>
			<Tab.Screen name="profile" component={Profile} />
			<Tab.Screen name="authore-recepies" component={AuthoreRecepies} />
		</Tab.Navigator>
	);
}

function HomeNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
			<Stack.Screen name="home" component={Home} />
			<Stack.Screen name="edit" component={Edit} />
			<Stack.Screen name="recipe" component={Recipe} />
			<Stack.Screen name="create" component={Create} />
			<Stack.Screen name="profile-page" component={ProfileNavigation} />
		</Stack.Navigator>
	);
}

function AuthirizationNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="sign-in">
			<Stack.Screen name="sign-in" component={SignIn} />
			<Stack.Screen name="sign-up" component={SignUp} />
		</Stack.Navigator>
	);
}

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="authorization-page">
				<Stack.Screen name="home-page" component={HomeNavigation} />
				<Stack.Screen name="authorization-page" component={AuthirizationNavigation} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
