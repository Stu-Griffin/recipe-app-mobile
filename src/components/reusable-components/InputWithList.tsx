import InputArea from './InputArea';
import uuid from 'react-native-uuid';
import SubmitButton from './SubmitButton';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import DeleteIcon from '../../../assets/icons/delete.svg';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import regularValidation from '../../extra-functions/regular-validation';
import { changeRecipeForm, RecipeFormRootState, deleteFromRecipeForm } from '../../redux';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../extra-functions/flash-message';

interface PropsI {
	Title: string;
	ErrorHandler: (key: string) => void;
}

export default function InputWithList({Title, ErrorHandler}: PropsI) {
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
			ErrorHandler(Title.toLowerCase());
		} else {
			showMessage({
				duration: 2500,
				description: `Please enter something in ${Title.toLowerCase()} filed`,
				type: getTypeForFlashMsg(404),
				message: getMessageForFlashMsg(404),
			});
		}
	};

	const deleteItem = (id: number): void => {
		dispatch(deleteFromRecipeForm({value: id, key: Title.toLowerCase()}));
		ErrorHandler(Title.toLowerCase());
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
			{
				recipe[Title.toLowerCase()].map((el: string, id: number) => {
					return (
						<View style={styles.box} key={(uuid.v4()).toString()}>
							<Text style={styles.text}>{el}</Text>
							<TouchableOpacity onPress={() => { deleteItem(id); }}>
								<DeleteIcon width={35} height={35}/>
							</TouchableOpacity>
						</View>
					);
				})
			}
		</View>
	);
} 

const styles = StyleSheet.create({
	box: {
		paddingVertical: 5,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		paddingHorizontal: 10,
		justifyContent: 'space-between',
	},
	text: {
		fontSize: 20
	},
	button: {
		marginTop: 35,
	},
});