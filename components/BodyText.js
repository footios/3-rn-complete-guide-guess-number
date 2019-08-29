import React from 'react'
import { StyleSheet, Text } from 'react-native';

const BodyText = props => {
    return (
        // use spread operator, so that BodyText can receive style from its parent
        <Text style={{...styles.body, ...props.style}} >{props.children}</Text>
    );
}

const styles = StyleSheet.create({
    body: {
		fontFamily: 'open-sans'
	}
})

export default BodyText;