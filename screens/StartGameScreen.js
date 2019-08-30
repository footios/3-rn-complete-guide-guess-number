import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	Dimensions,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	Alert
} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

// "Bug": The width of our buttons gets locked-in at start
// and doesn't adjust when the screen size changes (landscape/portrait).
// So we use an `addEventListener`
const StartGameScreen = (props) => {
	const [ enteredValue, setEnteredValue ] = useState('');
	const [ confirmed, setConfirmed ] = useState(false);
	const [ selectedNumber, setSelectedNumber ] = useState();
	const [ buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width / 4);

	// If input is not a number, replace it with an empty space.
	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	};

	// Resets the input when the `Reset` button is pressed.
	const resetInputHandler = () => {
		setEnteredValue('');
		setConfirmed(false);
	};

	// When the 'Dimensions' change, the `updateLayout` will be called.
	// In order to calulate `Dimensions` whenever the component renders,
	// we'll use the `useEffect` hook.
	useEffect(() => {
		const updateLayout = () => {
			// here we just give the buttons again their width,
			// so they will adjust on the device orientation
			setButtonWidth(Dimensions.get('window').width / 4);
		};
		Dimensions.addEventListener('change', updateLayout);

		// clean up in `return`
		// Note: return, returns a function!!!
		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	// Confirms the input, when `Confirm` button is pressed.
	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || (chosenNumber <= 0) | (chosenNumber > 99)) {
			Alert.alert('Invalid Number!', 'Please choose a number between 0 and 99.', [
				{
					text: 'Okay',
					style: 'destructive',
					onPress: resetInputHandler
				}
			]);
			return;
		}
		setConfirmed(true); // If true `confirmedOutput` will be rendered.
		setSelectedNumber(chosenNumber);
		setEnteredValue(''); // Resets `TextInput`
		Keyboard.dismiss();
	};

	let confirmedOutput;
	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<BodyText>You selected</BodyText>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
			</Card>
		);
	}

	return (
		<ScrollView>
			{/* 'position' works better on iOS and 'padding' on android 
			keyboardVerticalOffset = set distance between keyboard and TextInput */}
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
					<View style={styles.screen}>
						<TitleText style={styles.title}>Start a New Game!</TitleText>
						<Card style={styles.inputContainer}>
							<BodyText>Select a Number</BodyText>
							<Input
								style={styles.input}
								blurOnSubmit
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="number-pad"
								maxLength={2}
								onChangeText={numberInputHandler}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<View style={{ width: buttonWidth, margin: 10 }}>
									<Button color={Colors.reset} title="Reset" onPress={resetInputHandler} />
								</View>
								<View style={{ width: buttonWidth, margin: 10 }}>
									<Button color={Colors.confirm} title="Confirm" onPress={confirmInputHandler} />
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold'
	},
	inputContainer: {
		width: '80%',
		minWidth: 300,
		maxWidth: '95 %',
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	// button: {
	// 	// width: '40%',
	// 	// difference only for android: window = status bar height excluded, screen = not...
	// 	// '40%' would do the same job, but here we introduce Dimensions
	// 	width: Dimensions.get('window').width / 4, // each button gets the 1 fourth width of device
	// 	margin: 10
	// },
	input: {
		width: 50,
		textAlign: 'center'
	},
	summaryContainer: {
		margin: 20,
		padding: 10,
		alignItems: 'center'
	}
});

export default StartGameScreen;
