/* eslint-disable handle-callback-err */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text,TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import { Button, Toast } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'

import User from '../../assets/User'

class LoginScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phone: '',
        }
    }

    componentWillMount = () => {
        AsyncStorage.getItem('userPhone')
            .then( result => {
                if ( result ){ this.setState({phone: result})}
            })
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    handleSubmit = async () => {
        if ( this.state.phone.length < 10 ) {
            Alert.alert('Error', 'Wrong phone number!')
        } else if ( this.state.name < 3 ) {
            Alert.alert('Error', 'Wrong name')
        } else {
            //save user data
            await AsyncStorage.setItem('userPhone', this.state.phone)
            User.phone = this.state.phone
            firebase.database().ref('users/' + User.phone).set({name: this.state.name})
            this.props.navigation.navigate('Tabs');
        }
    }

    render() {
        return(
            <View behavior="padding" style={styles.Wrapper}>
                <View style={styles.bodyWrapper}>
                    <View >
                        <Text style={styles.SignInTitle}>Here To Get {'\n'}Welcomed!</Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder='Phone number'
                            underlineColorAndroid='#e6a400'
                            placeholderTextColor='#e3dac9'
                            keyboardType='number-pad'
                            value={this.state.phone}
                            style={styles.inputField}
                            onChangeText={(text) => this.handleChange( 'phone', text )}
                        />
                        <TextInput
                            placeholder='Name'
                            underlineColorAndroid='#e6a400'
                            placeholderTextColor='#e3dac9'
                            value={this.state.name}
                            style={styles.inputField}
                            onChangeText={(text) => this.handleChange( 'name', text )}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Button style={styles.SignInButton} dark title='Login' onPress={() => this.handleSubmit()} >
                            <Text style={{color:'white'}}>Login</Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.footerWrapper}>
                    <View style={{marginRight: 120}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('SignUp')} >
                            <Text style={styles.text}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View >
                        <TouchableOpacity onPress={()=> this.loggingIn()} >
                            <Text style={styles.text}>Forgot Password</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    Wrapper : {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#207561'
    },
    bodyWrapper: {
        flex: 6,
        justifyContent: 'center',
    },
    footerWrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
    },
    SignInTitle: {
        fontSize: 40,
        textAlign: 'left',
        fontWeight: 'bold',
        color: '#e3dac9',
        paddingBottom: 50
    },
    inputField: {
        width: 280,
        color: 'white',
        borderColor: 'white',
        marginTop: 5
    },
    SignInButton: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#e6a400",
    },
    text :{
        color: '#01024e',
        fontSize: 15,
    },
})

export default LoginScreen