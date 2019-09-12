/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'

class ProfileScreen extends Component {

    _logOut = async () => {
        await AsyncStorage.clear()
            .then(() => {
                firebase.auth().signOut()
                this.props.navigation.navigate('Login')
            })
            .catch(function(error) {
                console.error(error)
            })
    }

    render() {
        return (
        <View style={styles.viewStyles}>
            <Text style={styles.textStyles}>
                MaChat
            </Text>
            <TouchableOpacity onPress={ () => this._logOut()}>
                <Text>LogOut</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = {
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#353839'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
}

export default ProfileScreen;