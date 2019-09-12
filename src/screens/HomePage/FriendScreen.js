/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'

class FriendScreen extends Component {

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

    renderRow = ({item}) => {
        if (item.uid != this.state.uid )
        return (
            <TouchableOpacity style={{ padding: 10, flexDirection: 'row' }} onPress={ () => this.props.navigation.navigate('', {item: item}) }>
                <Image source={{uri: item.photo}} style={{height: 50, width: 50, borderRadius: 50}} />
                <View style={{paddingLeft: 10 }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>{item.fullname}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        {
                            item.status == 'online'? 
                            <View style={{ height: 10, width: 10, backgroundColor: 'blue', borderRadius: 50 }}></View>:
                            <View style={{ height: 10, width: 10, backgroundColor: 'grey', borderRadius: 50 }}></View>
                        }
                        <Text style={{ fontSize: 15, color: 'grey', paddingLeft: 5 }}>{item.status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return(
            <SafeAreaView style={{backgroundColor: '#353839', flex: 1}}>
                <FlatList 
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={ (item) => item.username }
                />
            </SafeAreaView>
        )
    }
}

export default FriendScreen