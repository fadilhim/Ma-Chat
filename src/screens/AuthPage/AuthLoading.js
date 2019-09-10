/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'

import firebaseConfig from '../../config/firebase'
import User from '../../assets/User'

export default class AuthLoadingScreen extends React.Component {

    componentDidMount() {
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        User.phone = await AsyncStorage.getItem('userPhone')
        this.props.navigation.navigate(User.phone ? 'Tabs' : 'Login')
    };

    render() {
        return (
        <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
        )
    }
}