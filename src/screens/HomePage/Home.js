/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'

import User from '../../assets/User'

class HomeScreen extends Component {

    state = {
        users: [],
        uid: ''
    }

    UNSAFE_componentWillMount = async () => {
        AsyncStorage.getItem('uid').then(
            (uid) => this.setState({
                uid: uid
            })
        )
        let dbRef = firebase.database().ref('users')
        await dbRef.on('child_added', ( value ) => {
            let person = value.val()
            person.uid = value.key
            this.setState(( prevState ) => {
                return {
                    users: [...prevState.users, person]
                }
            })
        })
    }

    _logOut = () => {
        firebase.auth().signOut()
            .then(() => {
                AsyncStorage.clear().then(() => this.props.navigation.navigate('Login'))
            })
            .catch(function(error) {
                console.error(error)
            })
    }

    renderRow = ({item}) => {
        if (item.uid != this.state.uid )
        return (
            <TouchableOpacity style={{ padding: 10, borderBottomColor: 'black', borderBottomWidth: 1}} onPress={ () => this.props.navigation.navigate('Chat', {item: item}) }>
                <Image source={{uri: item.photo}} style={{height: 60, width: 60, borderRadius: 60}} />
                <Text style={{ fontSize: 20, color: 'black' }}>{item.fullname}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <SafeAreaView>
                <FlatList 
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={ (item) => item.username }
                />
                <TouchableOpacity onPress={ () => this._logOut()}>
                    <Text>LogOut</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default HomeScreen