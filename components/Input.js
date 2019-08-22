import React from 'react'
import { StyleSheet, TextInput } from 'react-native';

const Input = props => {
    return (
        // use {...props} to configure the Input where you use it.
        <TextInput {...props} style={{ ...styles.input, ...props.style }}  />
    );
}

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginVertical: 10,
    }
})

export default Input;