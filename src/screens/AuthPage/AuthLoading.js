/* eslint-disable prettier/prettier */
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'

import firebaseConfig from '../../config/firebase'
import User from '../../assets/User'

export default class AuthLoadingScreen extends React.Component {
    componentWillMount(){
        // var firebaseConfig = {
        //     apiKey: "AIzaSyBKOp45FtfrhBfFMScN2RU2sDzpnk5nLiI",
        //     authDomain: "ma-chat-f90bc.firebaseapp.com",
        //     databaseURL: "https://ma-chat-f90bc.firebaseio.com",
        //     projectId: "ma-chat-f90bc",
        //     storageBucket: "",
        //     messagingSenderId: "923623573065",
        //     appId: "1:923623573065:web:7d673ef4f9fc47699b6198"
        // };
        // // Initialize Firebase
        // firebase.initializeApp(firebaseConfig);
    }

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