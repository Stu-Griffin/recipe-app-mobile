import InputArea from './InputArea';
import uuid from 'react-native-uuid';
import React, { useState, useEffect } from 'react';
import { RootState } from '../../redux';
import SubmitButton from './SubmitButton';
import { changeRecipeForm } from '../../redux';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import regularValidation from '../../extra-functions/regular-validation';

interface PropsI {
	Title: string;
}

export default function InputWithList({Title}: PropsI) {
	const dispatch = useDispatch();
	const [value, setValue] = useState<string>('');
	const [error, setError] = useState<boolean|null>(null);
	const recipe = useSelector((store: RootState) => store.recipe);
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);

	useEffect((): void => {
		setButtonStatus((error!==null)?!error:false);
	}, [error]);

	const buttonAction = (): void => {
		dispatch(changeRecipeForm({value, key: Title.toLowerCase()}));
		setValue('');
	};

	return (
		<View>
			<View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
				<InputArea
					Style={{width: 225}}
					Value={value}
					Title={Title}
					ErrorMsg={'Enter a '+Title}
					ErrorStatus={error}
					ChangeValue={(value: string) => {
						setValue(value);
						setError(regularValidation(value));
					}}
				/>
				<SubmitButton
					Title={'add'}
					Style={styles.button}
					Status={!buttonStatus}
					onPressFunc={buttonAction}
				/>
			</View>
			{recipe[Title.toLowerCase()].map((el: string) => {
				return (
					<View key={(uuid.v4()).toString()}>
						<Text>{el}</Text>
					</View>
				);
			})}
		</View>
	);
} 

const styles = StyleSheet.create({
	button: {
		marginTop: 35,
	}
});