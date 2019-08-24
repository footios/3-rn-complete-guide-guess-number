import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
 
// outside because it shouldn't be recreated in every rerendering...
const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min) + min);
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};
const GameScreen = (props) => {
	const [ currentGuess, setCurrentGuess ] = useState(
		generateRandomBetween(1, 100, props.userChoice));
	const [ rounds, settRounds ] = useState(0);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(
		() => {
			if (currentGuess === props.userChoice) {
				props.onGameOver(rounds);
			}
		},
		[ currentGuess, userChoice, onGameOver ]
	);
	const nextGuessHandler = (direction) => {
		const shouldBeLower = direction === 'lower' && currentGuess < props.userChoice;
		const shouldBeGreater = direction === 'greater' && currentGuess > props.userChoice;
		if (shouldBeLower || shouldBeGreater) {
			Alert.alert('Wrong hint!', 'Please try again.', [
				{
					text: 'Sorry',
					style: 'cancel'
				}
			]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		settRounds((curRounds) => curRounds + 1);
	};
	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.title } >Opponent's Guess: </Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<View style={styles.button}>
					<Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')} />
				</View>
				<View style={styles.button}>
					<Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')} />
				</View>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 300,
		maxWidth: '80%'
	},
	button: {
		width: '40%',
		margin: 10
	}
});

export default GameScreen;
