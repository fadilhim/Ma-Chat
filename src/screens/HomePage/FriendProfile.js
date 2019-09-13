/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'

class FriendProfileScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}></View>
                <Image style={styles.avatar} source={{uri: 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png' }}></Image>
                <View style={styles.body}>
                    <Text>MaChat</Text>
                    <TouchableOpacity onPress={ () => this._logOut()}>
                        <Text>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#353839'
    },
    header: {
        backgroundColor: "#353839",
        height:200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
    },
    body:{
        marginTop:40,
        width: '100%',
        height: '100%'
    },
})

export default FriendProfileScreen;