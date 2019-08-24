import React from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'


const GameOverScreen = (props) => {
	return (
		<View style={styles.screen}>
			<TitleText>Game Over!</TitleText>
			<View style={styles.imageContainer} >
			<Image style={styles.image} resizeMode={'cover'} source={require('../assets/success.png')} />
			</View>
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
	}, 
	imageContainer: {
		// in order to have a perfect circle in android
		// we need to put the width and heigt to be equal
		// and the borderRadius at half of their value
		width: 300,
		height: 300,
		borderRadius: 150,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		margin: 10
	},
	image: {
		width: '100%',
		height: '100%'
	}
});

export default GameOverScreen;
