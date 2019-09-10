/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'

import User from '../../assets/User'

class HomeScreen extends Component {

    state = {
        users: []
    }

    UNSAFE_componentWillMount() {
        let dbRef = firebase.database().ref('users')
        dbRef.on('child_added', ( val ) => {
            let person = val.val()
            person.phone = val.key
            if (person.phone===User.phone){
                User.name = person.name
            } else {
                this.setState(( prevState ) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }

    _logOut = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('AuthLoading')
    }

    renderRow = ({item}) => {
        return (
            <TouchableOpacity style={{ padding: 10, borderBottomColor: 'black', borderBottomWidth: 1}} onPress={ () => this.props.navigation.navigate('Chat', item) }>
                <Text style={{ fontSize: 20, color: 'black' }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        console.log(this.state)
        return(
            <SafeAreaView>
                <FlatList 
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={ (item) => item.phone }
                />
                <TouchableOpacity onPress={ () => this._logOut()}>
                    <Text>LogOut</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default HomeScreen