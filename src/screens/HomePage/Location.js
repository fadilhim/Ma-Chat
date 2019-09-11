/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class LocationScreen extends Component {

    render() {
        return (
        <View style={styles.viewStyles}>
            <Text style={styles.textStyles}>
                MaChat
            </Text>
        </View>
        );
    }
}

const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#207561'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
}

export default LocationScreen;