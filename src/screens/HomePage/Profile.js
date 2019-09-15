/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'
import Geocoder from 'react-native-geocoder'
import { Icon } from 'native-base'
import { ScrollView } from 'react-native-gesture-handler';

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
                <ImageBackground source={{ uri: user.header }} style={{ width: '100%', height: 250, }}>
                    <Image style={styles.avatar} source={{uri: user.photo }}></Image>
                </ImageBackground>
                </View>
                <ScrollView style={styles.body}>
                {/* <View style={styles.body}> */}
                    <TouchableOpacity style={{paddingLeft: 20, paddingTop: 7, paddingBottom: 7, borderBottomWidth: 0.6, borderBottomColor: '#35383930', }} activeOpacity={0.6}>
                        <Text style={{ paddingLeft: 9}}>Display name</Text>
                        <Text style={{ paddingLeft: 9, color: 'blue'}}>{user.fullname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft: 20, paddingTop: 7, paddingBottom: 7, borderBottomWidth: 0.6, borderBottomColor: '#35383930', }} activeOpacity={0.6}>
                        <Text style={{ paddingLeft: 9}}>Status message</Text>
                        <Text style={{ paddingLeft: 9, color: 'blue'}}>{user.fullname? 'Not Set' : user.fullname}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft: 20, paddingTop: 7, paddingBottom: 7, borderBottomWidth: 0.6, borderBottomColor: '#35383930',}} activeOpacity={0.6}>
                        <Text style={{ paddingLeft: 9}}>Email</Text>
                        <Text style={{ paddingLeft: 9, color: 'blue'}}>{user.email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft: 20, paddingTop: 7, paddingBottom: 7, borderBottomWidth: 0.6, borderBottomColor: '#35383930',}} activeOpacity={1}>
                        <Text style={{ paddingLeft: 9}}>ID</Text>
                        <Text style={{ paddingLeft: 9, color: 'blue'}}>{user.username}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingLeft: 20, paddingTop: 7, paddingBottom: 7, borderBottomWidth: 0.6, borderBottomColor: '#35383930',}} activeOpacity={0.6}>
                        <Text style={{ paddingLeft: 9}}>Birthday</Text>
                        <Text style={{ paddingLeft: 9, color: 'blue'}}>January 20, 2000</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => this._logOut()} style={styles.logOutButton}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Log Out</Text>
                    </TouchableOpacity>
                {/* </View> */}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    logOutButton: {
        marginTop: 20,
        marginLeft: 120,
        height: 45,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        borderRadius:20 ,
        backgroundColor: "#696969",
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
        height:250,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
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