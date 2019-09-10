/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import User from '../../assets/User';

class HomeScreen extends Component {

    _logOut = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('AuthLoading')
    }

    render() {
        return(
            <View>
                <Text>
                    {User.phone}
                </Text>
                <TouchableOpacity onPress={() => this._logOut()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default HomeScreen