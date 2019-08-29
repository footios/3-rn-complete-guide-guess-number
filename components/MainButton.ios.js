import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

import Colors from '../constants/colors';

const MainButton = (props) => {

	// Use MainButton.ios.js and MainButton.android.js 
	// and delete all the Platform.OS checks.
	// RN automatically choses the right file... 
	// Note: Here we don't really need the spit into 2 files... 
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
			<View style={styles.button}>
				<Text style={styles.buttonText}>{props.children}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
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
