/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'

class ProfileScreen extends Component {

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
        return (
        <View style={styles.viewStyles}>
            <Text style={styles.textStyles}>
                MaChat
            </Text>
            <TouchableOpacity onPress={ () => this._logOut()}>
                <Text>LogOut</Text>
            </TouchableOpacity>
        </View>
        // <View style={styles.container}>
        //     <View style={styles.header}></View>
        //     <Image style={styles.avatar} source={{uri: 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png'}}/>
        //     <View style={styles.body}>
        //         <View style={styles.bodyContent}>
        //             <Text style={styles.name}>fadilhimawan username</Text>
        //             <Text style={styles.descriptionLabel}>Full Name</Text>
        //             <Text style={styles.description}>Fadil Himawan</Text>
        //             <Text style={styles.descriptionLabel}>Phone Number</Text>
        //             <Text style={styles.description}>085941351106</Text>
        //             <View style={styles.button}>
        //                 <TouchableOpacity style={styles.buttonContainer} onPress={ () => this._logOut()}>
        //                     <Text style={{color: 'white'}}>Log Out</Text>  
        //                 </TouchableOpacity>
        //             </View>    
        //         </View>
        //     </View>
        // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#353839'
    },
    header: {
        backgroundColor: "#4B4C72",
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
    name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
    },
    body:{
        marginTop:40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:30,
        backgroundColor: '#353839'
    },
    profileContainer: {
        marginTop: 30,
        marginBottom: 130,
        marginRight: 40
    },
    name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
    },
    info:{
        fontSize:16,
        color: "green",
        marginTop:10
    },
    descriptionLabel:{
        fontSize:20,
        fontWeight: 'bold',
        color: "#696969",
        marginTop: 5,
        textAlign: 'left'
    },
    description:{
        fontSize:16,
        color: "#696969",
        marginTop: 1,
        marginBottom: 3,
        textAlign: 'left'
    },
    button: {
        marginTop: 70
    },
    buttonDonateContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#4B4C72",
    },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#8B0000",
    },
    viewStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#353839'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
})

export default ProfileScreen;