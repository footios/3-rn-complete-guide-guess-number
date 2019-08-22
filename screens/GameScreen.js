import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

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
	const [ currentGuess, setCurrentGuess ] = useState(generateRandomBetween(1, 100, props.userChoice));
	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess: </Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<View style={styles.button}>
					<Button title="LOWER" onPress={() => {}} />
				</View>
				<View style={styles.button}>
					<Button title="GREATER" onPress={() => {}} />
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
