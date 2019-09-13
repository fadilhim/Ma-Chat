/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'

class LocationScreen extends Component {
    constructor(props){
        super(props)
        this.state= {
            // currentUser: firebase.auth().currentUser,
            userPosition: {}
        }
    }

    componentDidMount = async () => {
        await AsyncStorage.getItem('uid').then(
            (uid) => {
                firebase.database().ref('users/' + uid + '/position').once('value').then(
                    (value) => {
                        this.setState({userPosition: value},()=>this.forceUpdate())
                        console.warn(typeof value.latitude)
                    }
                )
            }
        )
    }

    render() {
        console.warn(this.state.userPosition, 'position')
        return (
        <View style={styles.viewStyles}>
            <MapView
                style={{width: '100%', height: '100%'}}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: -7.24917,
                    longitude: 112.75083,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                zoomControlEnabled={true}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                {/* <Marker
                    key={this.state.userPosition.latitude + this.state.userPosition.longitude}
                    // coordinate={{ latitude: this.state.userPosition.latitude || 0, longitude: this.state.userPosition.longitude || 0 }}
                    // coordinate={this.state.userPosition}
                /> */}
            </MapView>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    viewStyles: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b444b'
    },
    textStyles: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
})

export default LocationScreen;