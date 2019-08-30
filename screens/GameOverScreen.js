import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground, Dimensions, Text, ScrollView } from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = (props) => {
	const [ availableDeviceHeight, setAvailableDeviceHeight ] = useState(Dimensions.get('window').height);

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceHeight(Dimensions.get('window').height);
		};
		Dimensions.addEventListener('change', updateLayout);

		// Note: `return`, returns a function!!!
		return () => Dimensions.removeEventListener('change', updateLayout);
	});

	if (availableDeviceHeight > 500) {
		return (
			<ScrollView contentContainerStyle={styles.screen}>
				<TitleText>The Game is Over!</TitleText>
				<View style={styles.imageContainerBig}>
					<Image
						source={{
							uri:
								'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
						}}
						style={styles.image}
						resizeMode="cover"
					/>
				</View>
				<View style={styles.resultContainerBig}>
					<BodyText style={styles.resultText}>
						Your phone needed
						<Text style={styles.highlight}> {props.roundsNumber} </Text> rounds to guess number
						<Text style={styles.highlight}> {props.userNumber}</Text>
					</BodyText>
				</View>
				<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
			</ScrollView>
		);
	}
	if (availableDeviceHeight < 500) {
		return (
			<ScrollView contentContainerStyle={styles.screen}>
				<View style={styles.resultContainerSmall}>
					<BodyText style={styles.resultText}>
					Your phone {"\n"} needed {"\n"}
						<Text style={styles.highlight}> {props.roundsNumber} </Text>
						{"\n"} rounds{' '}
					</BodyText>
					<View style={styles.imageContainerSmall}>
						<ImageBackground
							source={{
								uri:
									'https://images.unsplash.com/photo-1454942901704-3c44c11b2ad1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
							}}
							style={styles.image}
							resizeMode="cover"
						>
							<View style={styles.gameOver}>
								<TitleText>Game Over</TitleText>
							</View>
						</ImageBackground>
					</View>

					<BodyText style={styles.resultText}>
						{' '}
						to guess {"\n"} number {"\n"}
						<Text style={styles.highlight}> {props.userNumber} </Text>
					</BodyText>
				</View>

				<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10
	},
	imageContainerBig: {
		width: Dimensions.get('window').width * 0.7,
		height: Dimensions.get('window').width * 0.7,
		borderRadius: Dimensions.get('window').width * 0.7 / 2,
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		marginVertical: Dimensions.get('window').height / 30
	},
	imageContainerSmall: {
		// in order to have a perfect circle in android
		// we need to put the width and heigt to be equal
		// and the borderRadius at half of their value
		width: Dimensions.get('window').width * 0.5,
		height: Dimensions.get('window').width * 0.5, // same height as width, to have a square...
		borderRadius: Dimensions.get('window').width * 0.5 / 2, // halve of width height
		borderWidth: 3,
		borderColor: 'black',
		overflow: 'hidden',
		margin: 10
	},
	image: {
		// put width and height to 100% and control image from imageContainer
		width: '100%',
		height: '100%'
	},
	gameOver: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	},
	resultContainerBig: {
		marginHorizontal: 50,
		marginVertical: Dimensions.get('window').height / 60
	},
	resultContainerSmall: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
	},
	resultText: {
		textAlign: 'center',
		fontSize: Dimensions.get('window').height < 400 ? 16 : 20
	}
});

export default GameOverScreen;
