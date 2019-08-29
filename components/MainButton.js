import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import Colors from '../constants/colors';

const MainButton = (props) => {
	// We can set a variable starting with a Capital letter,
	// which we then can use as a JSX element.
	let ButtonComponent = TouchableOpacity;

	// Only Android Version 21 and higher supports the ripple effect.
	if (Platform.OS == 'android' && Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback;
	}
	return (
		<View style={styles.buttonContainer} >
		<ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>{props.children}</Text>
			</View>
		</ButtonComponent>
		</View>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 20,
		overflow: 'hidden' // no child component can go over it 
	},
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 20
	},
	buttonText: {
		color: 'white',
		fontFamily: 'open-sans',
		fontSize: 20,
		textAlign: 'center',
		alignContent: 'center'
	}
});

export default MainButton;
