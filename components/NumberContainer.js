import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Colors from '../constants/colors'

const NumberContainer = (props) => {
	return (
		<View style={styles.container} >
			<Text style={styles.number} >{props.children}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.confirm,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    number: {
        color: Colors.confirm,
        fontSize: 22
    }
});

export default NumberContainer;
