/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'

import User from '../../assets/User'

class HomeScreen extends Component {

    state = {
        // users: [],
        currentUser: null
    }

    UNSAFE_componentWillMount = async () => {
        const uid = await AsyncStorage.getItem('uid')
        const { currentUser } = firebase.auth()
        dbRef.on('child_added', ( value ) => {
            console.warn(value)
            let person = value.val()
            person.uid = value.key
            if (person.username === User.phone){
                User.name = person.name
            // } else {
            //     this.setState(( prevState ) => {
            //         return {
            //             users: [...prevState.users, person]
            //         }
            //     })
            }
        })
    }

    _logOut = () => {
        firebase.auth().signOut()
            .then(function() {
                AsyncStorage.clear()
            })
            .catch(function(error) {
                console.error(error)
            })
    }

    renderRow = ({item}) => {
        return (
            <TouchableOpacity style={{ padding: 10, borderBottomColor: 'black', borderBottomWidth: 1}} onPress={ () => this.props.navigation.navigate('Chat', item) }>
                <Text style={{ fontSize: 20, color: 'black' }}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { currentUser } = this.state
        console.log(this.state)
        return(
            <SafeAreaView>
                {/* <Text>{currentUser.username}</Text> */}
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