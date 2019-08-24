import React from 'react'
import { View, StyleSheet, Text } from 'react-native';

const BodyText = props => {
    return (
        <Text style={styles.title} >{props.children}</Text>
    );
}

const styles = StyleSheet.create({
    title: {
		fontFamily: 'open-sans'
	}
})

export default BodyText;