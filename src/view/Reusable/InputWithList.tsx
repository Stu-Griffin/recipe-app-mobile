import InputArea from './InputArea';
import uuid from 'react-native-uuid';
import SubmitButton from './SubmitButton';
import { RootState } from '../../types/redux';
import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import StepIngredientItem from './StepIngredientItem';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { regularValidation } from '../../controller/validation';
import { changeRecipeForm, deleteFromRecipeForm } from '../../redux/recipe';
import { getTypeForFlashMsg, getMessageForFlashMsg } from '../../controller/flash-message';

interface PropsI {
  Title: string;
  ErrorHandler: (key: string) => void;
}

export default function InputWithList({ Title, ErrorHandler }: PropsI) {
	const dispatch = useDispatch();
	const [value, setValue] = useState<string>('');
	const [error, setError] = useState<boolean | null>(null);
	const [buttonStatus, setButtonStatus] = useState<boolean>(false);
	const recipe = useSelector((store: RootState) => store.recipeForm);

	useEffect((): void => {
		setButtonStatus(error !== null ? !error : false);
	}, [error]);

	const buttonAction = (): void => {
		if (!regularValidation(value)) {
			dispatch(changeRecipeForm({ value, key: Title.toLowerCase() }));
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
		dispatch(deleteFromRecipeForm({ value: id, key: Title.toLowerCase() }));
		ErrorHandler(Title.toLowerCase());
	};

	return (
		<View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<InputArea
					Style={{ width: 225 }}
					Value={value}
					Title={Title}
					ErrorMsg={'Enter a ' + Title}
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
			{recipe[Title.toLowerCase()].map((el: string, id: number) => {
				return (
					<StepIngredientItem
						el={el}
						id={id}
						buttonType={'delete'}
						key={uuid.v4().toString()}
						action={() => {
							deleteItem(id);
						}}
					/>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		marginTop: 35,
	},
});
