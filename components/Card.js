import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Card = (props) => {
	return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
	card: {
		margin: 10, 
		shadowColor: 'black',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowRadius: 6,
		shadowOpacity: 0.26,
		backgroundColor: 'white',
		// elevation: (android) uses the default from material design
		elevation: 5,
		borderRadius: 10
		// target individual corners with borderBottomLeftRadius etc.
	}
});

export default Card;
