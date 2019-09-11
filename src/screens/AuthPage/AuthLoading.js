/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native'
import firebase from 'firebase'

import firebaseConfig from '../../config/firebase'
import User from '../../assets/User'

export default class AuthLoadingScreen extends React.Component {

    componentDidMount() {
        this._bootstrapAsync()
    }

    _bootstrapAsync = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Tabs' : 'Login')
        })
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