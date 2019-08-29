import React from 'react';
import { View, StyleSheet, Image, Dimensions, Text, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
	return (
		<ScrollView contentContainerStyle={styles.screen}>
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
					<Text style={styles.highlight}> {props.userNumber} </Text>
				</BodyText>
			</View>
			<MainButton onPress={props.onRestart}>{'NEW GAME'}</MainButton>
		</ScrollView>
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
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').width * 0.7, // same height as width, to have a square...
		borderRadius: 150, // halve of width height
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: Dimensions.get('window').height / 30 // This sets it to 5% of device height
	},
	image: {
		// put width and height to 100% and control image from imageContainer
		width: '100%',
		height: '100%'
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	},
	resultContainer: {
		marginHorizontal: 50,
		marginVertical: Dimensions.get('window').height / 60
	},
	resultText: {
		textAlign: 'center',
		fontSize: Dimensions.get('window').height < 400 ? 16 : 20
	}
});

export default GameOverScreen;
