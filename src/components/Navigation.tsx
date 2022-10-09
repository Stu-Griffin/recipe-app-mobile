import React from 'react';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import ListIcon from '../../assets/icons/list.svg';
import AuthoreRecepies from './Profile/AuthorsRecepies';
import SignIn from './Authorization-registration/SignIn';
import SignUp from './Authorization-registration/SignUp';
import ProfileIcon from '../../assets/icons/profile.svg';
import { NavigationContainer } from '@react-navigation/native';
import ActiveListIcon from '../../assets/icons/active-list.svg';
import ActiveProfileIcon from '../../assets/icons/active-profile.svg';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ProfileNavigation() {
	return (
		<Tab.Navigator initialRouteName="profile"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarLabel:() => null,
				tabBarActiveTintColor: 'pink',
				tabBarInactiveTintColor: 'gray',
				tabBarIcon: ({ focused, size }) => {
					switch(route.name) {
					case 'profile':
						return (focused) ? <ActiveProfileIcon size={size} /> : <ProfileIcon size={size} />;
					case 'authore-recepies':
						return (focused) ? <ActiveListIcon size={size} /> : <ListIcon size={size} />;
					}
				},
			})}
		>
			<Tab.Screen name="profile" component={Profile} />
			<Tab.Screen name="authore-recepies" component={AuthoreRecepies} />
		</Tab.Navigator>
	);
}

function HomeNavigation() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
			<Stack.Screen name="home" component={Home} />
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
			<Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="profile-page">
				<Stack.Screen name="home-page" component={HomeNavigation} />
				<Stack.Screen name="authorization-page" component={AuthirizationNavigation} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}