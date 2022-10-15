import InputArea from './InputArea';
import uuid from 'react-native-uuid';
import SubmitButton from './SubmitButton';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { changeRecipeForm, RecipeFormRootState } from '../../redux';
import regularValidation from '../../extra-functions/regular-validation';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../extra-functions/flash-message';

interface PropsI {
	Title: string;
}

export default function InputWithList({Title}: PropsI) {
	const dispatch = useDispatch();
	const [value, setValue] = useState<string>('');
	const [error, setError] = useState<boolean|null>(null);
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const recipe = useSelector((store: RecipeFormRootState) => store.recipeForm);

	useEffect((): void => {
		setButtonStatus((error!==null)?!error:false);
	}, [error]);

	const buttonAction = (): void => {
		if(!regularValidation(value)) {
			dispatch(changeRecipeForm({value, key: Title.toLowerCase()}));
			setValue('');
		} else {
			showMessage({
				duration: 2500,
				description: `Please enter something in ${Title.toLowerCase()} filed`,
				type: getTypeForFlashMsg(404),
				message: getMessageForFlashMsg(404),
			});
		}
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