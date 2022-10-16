import React from 'react';
import { View } from 'react-native';
import { store } from './src/redux';
import { Provider } from 'react-redux';
import Navigation from './src/components/Navigation';
import FlashMessage from 'react-native-flash-message';

export default function App() {
	return (
		<View style={{flex: 1}}>
			<Provider store={store}>
				<Navigation/>
			</Provider>
			<FlashMessage position="top"/>
		</View>
	);
}