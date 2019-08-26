import React from 'react';
import { View, StyleSheet, Image, Button, Text } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';

const GameOverScreen = (props) => {
	return (
		<View style={styles.screen}>
			<TitleText>Game Over!</TitleText>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					resizeMode={'cover'}
					fadeDuration={1000} // default: 300
					// source={require('../assets/success.png')} // local image
					source={{
						uri:
							'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
					}}
				/>
			</View>
			{/* Nested Texts receive the style of parents... */}
			<View style={styles.resultContainer}>
				<BodyText style={styles.resultText}>
					Your phone needed
					<Text style={styles.highlight}> {props.roundsNumber} </Text>
					rounds to guess number
					<Text style={styles.highlight}> 2 {props.userNumber} </Text>
				</BodyText>
			</View>
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
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	},
	resultContainer: {
		marginHorizontal: 50,
		marginVertical: 15
	},
	resultText: {
		textAlign: 'center',
		fontSize: 20
	}
});

export default GameOverScreen;
