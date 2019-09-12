/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Image, StyleSheet } from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'

class FriendScreen extends Component {

    state = {
        users: [],
        uid: ''
    }

    UNSAFE_componentWillMount = async () => {
        await AsyncStorage.getItem('uid').then(
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

    _renderRow = ({item}) => {
        if (item.uid != this.state.uid ){
            return (
                <TouchableOpacity style={styles.friendListContainer} onPress={ () => this.props.navigation.navigate('', {item: item}) }>
                    <Image source={{uri: item.photo}} style={styles.friendImage} />
                    <View style={{paddingLeft: 10 }}>
                        <Text style={styles.friendName}>{item.fullname}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {
                                item.status == 'online'? 
                                <View style={styles.friendOnline}></View>:
                                <View style={styles.friendOffline}></View>
                            }
                            <Text style={styles.friendStatus}>{item.status}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <FlatList 
                    data={this.state.users}
                    renderItem={this._renderRow}
                    keyExtractor={ (item) => item.username }
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#353839',
        flex: 1,
    },
    friendListContainer: {
        padding: 10,
        flexDirection: 'row'
    },
    friendImage: {
        height: 50,
        width: 50,
        borderRadius: 50
    },
    friendName: {
        fontSize: 20,
        color: 'white',
    },
    friendOnline: {
        height: 10,
        width: 10,
        backgroundColor: '#207561',
        borderRadius: 50,
    },
    friendOffline: {
        height: 10,
        width: 10,
        backgroundColor: 'grey',
        borderRadius: 50,
    },
    friendStatus: {
        fontSize: 15,
        color: 'grey',
        paddingLeft: 5,
    },
})

export default FriendScreen