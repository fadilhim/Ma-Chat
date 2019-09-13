/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import Geocoder from 'react-native-geocoder'

class ProfileScreen extends Component {
    constructor(props){
        super(props)
        this.state= {
            friendProfile : props.navigation.getParam('item'),
            userAddress: ''
        }
    }

    componentDidMount = () => {
        Geocoder.geocodePosition({
            lat: this.state.friendProfile.position.latitude,
            lng: this.state.friendProfile.position.longitude
        })
        .then(res => {
            this.setState({
                userAddress: res[0].formattedAddress
            })
        })
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.friendProfile)
        let user = this.state.friendProfile
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.profileLabel}>{user.fullname}</Text>
                    <Image style={styles.avatar} source={{uri: user.photo }}></Image>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Chat', {item: user}) } style={styles.logOutButton}>
                        <Text style={{color: '#696969', fontWeight: 'bold'}}>Chat</Text>
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
        width: 50,
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