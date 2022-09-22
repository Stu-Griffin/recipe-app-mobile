import React from 'react';
import { Provider } from 'react-redux';
import SignIn from './src/components/SignIn';
import { store } from './src/redux';

export default function App() {
	return (
		<Provider store={store}>
			<SignIn/>
		</Provider>
	);
}