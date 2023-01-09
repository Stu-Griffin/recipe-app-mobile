import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import Navigation from './src/view/Navigation';
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