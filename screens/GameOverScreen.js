import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'


const GameOverScreen = (props) => {
	return (
		<View style={styles.screen}>
			<TitleText>Game Over!</TitleText>
			<BodyText>Number of rounds: {props.roundsNumber} </BodyText>
			<BodyText>Number was: {props.userNumber} </BodyText>
			<Button title="NEW GAME" onPress={props.onRestart} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default GameOverScreen;
