/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import firebase from 'firebase'

import User from '../../assets/User'

class HomeScreen extends Component {

    state = {
        // users: [],
        currentUser: null
    }

    UNSAFE_componentWillMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        // let dbRef = firebase.database().ref('users')
        // dbRef.on('child_added', ( val ) => {
        //     let person = val.val()
        //     person.phone = val.key
        //     if (person.phone===User.phone){
        //         User.name = person.name
        //     } else {
        //         this.setState(( prevState ) => {
        //             return {
        //                 users: [...prevState.users, person]
        //             }
        //         })
        //     }
        // })
    }

    _logOut = () => {
        firebase.auth().signOut()
            .then(function() {
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
                <Text>{currentUser.username}</Text>
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