import React from 'react';
import { store } from './src/redux';
import { Provider } from 'react-redux';
import Navigation from './src/components/Navigation';
import FlashMessage from 'react-native-flash-message';

export default function App() {
	return (
		<Provider store={store}>
			<FlashMessage position="top"/>
			<Navigation/>
		</Provider>
	);
}