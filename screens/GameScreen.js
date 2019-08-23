import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

// outside because it shouldn't be recreated in every rerendering...
// The function is working fine and it finds the right number automatically.
// So there is no need to give hints.
// The logic off the app is different, so this cannot be applied.
const findNumber = function(min, max, x) {
	let counter = 0
	
	let num = 0;
	let start = min,
	  end = max;
  
	// Iterate while start not meets end
	while (start <= end) {
	  // Find the mid index
	  
	  let mid = Math.floor((start + end) / 2);
  
	  // If element is present at mid, return True
	  if (mid === x) {
		
		num = mid;
		return num;
	  }
	  // Else look in left or right half accordingly
	  else if (mid < x) start = mid + 1;
	  else end = mid - 1;
  console.log("mid", mid, "start", start, end)
  counter++;
	 console.log('counter', counter)
	}
	return num;
  };

const GameScreen = (props) => {

	const [ currentGuess, setCurrentGuess ] = useState(findNumber(1, 100, props.userChoice));
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
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNumber = findNumber(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		settRounds((curRounds) => curRounds + 1);
	};
	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess: </Text>
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
