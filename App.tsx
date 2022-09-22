import React from 'react';
import { Provider } from 'react-redux';
import SignUp from './src/components/SignUp';
import { store } from './src/redux';

export default function App() {
	return (
		<Provider store={store}>
			<SignUp/>
		</Provider>
	);
}