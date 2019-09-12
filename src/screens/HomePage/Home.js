/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Image, PermissionsAndroid } from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from 'react-native-geolocation-service'

class HomeScreen extends Component {

    constructor(props) {
        super(props)
    }

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

    componentDidMount = async () => {
        let hasLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if(!hasLocationPermission){
            hasLocationPermission = await this.requestLocationPermission()
        } else {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.warn(position);
                },
                (error) => {
                    // See error code charts below.
                    console.warn(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            )
        }
    }

    requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                title: 'Ma-Chat Location Permission',
                message:
                    `Ma-Chat needs permission to get your location`,
                    buttonNeutral: 'Ask Me Later',
                    buttonPositive: 'OK',
                    buttonNegative: 'Cancel',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED
        } catch (err) {
            console.warn(err);
            return false
        }
    }

    _renderRow = ({item}) => {
        if (item.uid != this.state.uid ){
            return (
                <TouchableOpacity style={{ padding: 10, flexDirection: 'row' }} onPress={ () => this.props.navigation.navigate('Chat', {item: item}) }>
                    <Image source={{uri: item.photo}} style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{paddingLeft: 10 }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>{item.fullname}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>

                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return(
            <SafeAreaView style={{backgroundColor: '#353839', flex: 1}}>
                <FlatList 
                    data={this.state.users}
                    renderItem={this._renderRow}
                    keyExtractor={ (item) => item.username }
                />
            </SafeAreaView>
        )
    }
}

export default HomeScreen