import React from 'react';
import { store } from './src/redux';
import { Provider } from 'react-redux';
import Navigation from './src/components/Navigation';

export default function App() {
	return (
		<Provider store={store}>
			<Navigation/>
		</Provider>
	);
}