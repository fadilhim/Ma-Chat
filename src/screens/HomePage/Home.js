/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, Image, PermissionsAndroid, StyleSheet } from 'react-native';
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from 'react-native-geolocation-service'
import { Spinner } from 'native-base'
import { SearchBar } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

class HomeScreen extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        users: [],
        uid: '',
        lastmsg: []
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

            let friendList = person.uid
            let lastmsg = firebase.database().ref('messages').child(this.state.uid).child(friendList).orderByKey().limitToLast(1)
            lastmsg.on('child_added', (mssg) => {
                let lastmsg = this.state.lastmsg
                lastmsg.push({[mssg.key]: mssg.val()})
                this.setState({
                    lastmsg
                })
                // console.log(this.state.lastmsg)
            })
        })
    }

    componentDidMount = async () => {
        let hasLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        if(!hasLocationPermission){
            hasLocationPermission = await this.requestLocationPermission()
        } else {
            Geolocation.watchPosition(
                (position) => {
                    let userPosition = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                    firebase.database().ref('users/' + this.state.uid).update({
                        position: userPosition,
                        lastSeen: position.timestamp
                    })
                },
                (error) => {
                    // See error code charts below.
                    console.warn(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, forceRequestLocation: true, maximumAge: 10000, distanceFilter: 1 }
            )
        }
    }

    componentWillUnmount = () => {
        Geolocation.stopObserving()
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
        let msg = this.state.lastmsg
        // console.log(msg)
        if (item.uid != this.state.uid ){
            return (
                <TouchableOpacity style={{ padding: 10, flexDirection: 'row' }} onPress={ () => this.props.navigation.navigate('Chat', {item: item}) }>
                    <Image source={{uri: item.photo}} style={{height: 50, width: 50, borderRadius: 50}} />
                    <View style={{paddingLeft: 10 }}>
                        <Text style={{ fontSize: 15, color: 'white' }}>{item.fullname}</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            {msg.map( (value) => {
                                value._id  == item.uid ?
                                <Text>{value.text}</Text> : <Text></Text>
                            })}
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return(
            <SafeAreaView style={{backgroundColor: '#353839', flex: 1}}>
                <View style={{height: 52, backgroundColor: '#353839', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: 20, fontFamily: 'Roboto', marginLeft: 10}}>Chats</Text>
                </View>
                <ScrollView>
                    <SearchBar
                        placeholder= 'Search'
                        placeholderTextColor= 'grey'
                        // onChangeText={this.updateSearch}
                        // value={search}
                        containerStyle={styles.searchInput}
                        inputContainerStyle={styles.inputContainer}
                    />
                    {this.state.users.length > 0 ?
                        <FlatList 
                            data={this.state.users}
                            renderItem={this._renderRow}
                            keyExtractor={ (item) => item.username }
                        />
                        :
                        <Spinner color='white' />
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles =  StyleSheet.create({
    searchInput: {
        backgroundColor: 'transparent',
        width: '100%',
        height: 40,
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    inputContainer: {
        backgroundColor: '#E5E6EE20',
        height: 31,
        justifyContent: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        // fontSize: 10
    },
})

export default HomeScreen