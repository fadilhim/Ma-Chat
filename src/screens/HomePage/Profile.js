/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'
import Geocoder from 'react-native-geocoder'
import { Icon } from 'native-base'

class ProfileScreen extends Component {
    constructor(){
        super()
        this.state= {
            userProfile: {},
            userAddress: ''
        }
    }

    UNSAFE_componentWillMount = async () => {
        await AsyncStorage.getItem('uid')
        .then( async (uid) => {
            await firebase.database().ref('users/' + uid).once('value')
            .then( (value) => {
                this.setState( {userProfile: value.val()} )
            })
        })

        Geocoder.geocodePosition({
            lat: this.state.userProfile.position.latitude,
            lng: this.state.userProfile.position.longitude
        })
        .then(res => {

            this.setState({
                userAddress: res[0].formattedAddress
            })
        })
        .catch(err => console.log(err))
    }

    _logOut = async () => {
        await AsyncStorage.getItem('uid')
            .then( async (uid) => {
                firebase.database().ref('users/' + uid).update({ status: 'offline' })
                await AsyncStorage.clear()
                firebase.auth().signOut()
                this.props.navigation.navigate('Login')
            })
            .catch(function(error) {
                console.error(error)
            })
    }

    render() {
        let user = this.state.userProfile
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.profileLabel}>{user.fullname}</Text>
                    <Image style={styles.avatar} source={{uri: 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png' }}></Image>
                    <TouchableOpacity onPress={ () => this._logOut()} style={styles.logOutButton}>
                        <Text style={{color: '#696969', fontWeight: 'bold'}}>Log Out</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
                        <Icon type='MaterialCommunityIcons' name='gmail' style={{fontSize: 37, color: '#353839'}}/>
                        <Text style={{alignSelf: 'center', paddingLeft: 9}}>{user.email}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
                        <Icon type='Entypo' name='location-pin' style={{fontSize: 37, color: '#353839'}}/>
                        <Text style={{alignSelf: 'center', paddingLeft: 7}}>{this.state.userAddress}</Text>
                    </View>
                    <View style={{flexDirection: 'row', marginLeft: 20, marginTop: 10}}>
                        <Icon type='Entypo' name='eye' style={{fontSize: 33, color: '#353839'}}/>
                        <Text style={{alignSelf: 'center', paddingLeft: 9}}>{ new Date(user.lastSeen) + '' }</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logOutButton: {
        marginTop: 160,
        marginLeft: 80,
        height: 45,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:20 ,
        backgroundColor: "white",
    },
    profileLabel:{
        fontSize:20,
        fontWeight: 'bold',
        color: "white",
        marginTop: 35,
        textAlign: 'center'
    },
    container: {
        // backgroundColor: '#353839'
    },
    header: {
        backgroundColor: "#353839",
        height:300,
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
        marginTop:70
    },
    body:{
        // marginTop:40,
        width: '100%',
        height: '100%'
    },
})

export default ProfileScreen;