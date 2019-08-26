import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

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

// This func rendrers the list of guesses.
const renderListItem = (value, numberOfRounds) => (
	<View style={styles.listItem} key={value}>
		<BodyText>#{numberOfRounds}</BodyText>
		<BodyText>{value}</BodyText>
	</View>
);

const GameScreen = (props) => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);

	const [ currentGuess, setCurrentGuess ] = useState(initialGuess);
	const [ pastGuesses, setPastGuesses ] = useState([ initialGuess ]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(
		() => {
			if (currentGuess === props.userChoice) {
				const rounds = pastGuesses.length;
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
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		// currentGuess wouldn't work, because React wouldn't have updated
		// the state and rebuild the component
		setPastGuesses((currentGuess) => [ nextNumber, ...pastGuesses ]);
	};
	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.title}>Opponent's Guess: </Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<View style={styles.button}>
					<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
						<Ionicons name="md-remove-circle" size={35} color="white" />
					</MainButton>
				</View>
				<View style={styles.button}>
					<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
						<Ionicons name="md-add-circle" size={35} color="white" />
					</MainButton>
				</View>
			</Card>
			<View style={styles.listContainer}>
				{/* we subtract the index from pastGuesses.length to have the last index by the last guess */}
				<ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView>
			</View>
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
		justifyContent: 'space-between',
		marginTop: 20,
		width: '80%',
		maxWidth: '90%'
	},
	button: {
		width: '30%',
		margin: 10
	},
	listItem: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		width: '60%'
	},
	listContainer: {
		flex: 1, // this is to scroll on android
		width: '80%'
	},
	list: {
		// flex: 1, // does do the job: starts list from bottom but is not scrollable 
		flexGrow: 1,
		alignItems: 'center',
		justifyContent:'flex-end'
	}
});

export default GameScreen;
