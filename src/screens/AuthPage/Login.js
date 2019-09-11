/* eslint-disable handle-callback-err */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text,TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native'
import { Button, Toast } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'

class LoginScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errorMessage: null
        }
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    handleSubmit = async () => {
        if ( this.state.email.length < 10 ) {
            Alert.alert('Error', 'email !')
        } else if ( this.state.password.length < 3 ) {
            Alert.alert('Error', 'Wrong password')
        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then( async (result) =>{
                    await firebase.database().ref('users/' + result.user.uid).update({ status: 'online' })
                    AsyncStorage.setItem('uid', result.user.uid)
                    AsyncStorage.setItem('name', result.user.displayName)
                    AsyncStorage.setItem('image', result.user.image)
                    this.props.navigation.navigate('Tabs')
                })
                .catch(error => this.setState({ errorMessage: error.message }))
        }
    }

    render() {
        return(
            <View behavior="padding" style={styles.Wrapper}>
                <View style={styles.bodyWrapper}>
                    <View >
                        <Text style={styles.SignInTitle}>Welcome to{'\n'}MaChat!</Text>
                    </View>
                    <View>
                        <TextInput
                            placeholder='Email'
                            keyboardType='email-address'
                            underlineColorAndroid='#e6a400'
                            placeholderTextColor='#e3dac9'
                            value={this.state.phone}
                            style={styles.inputField}
                            onChangeText={(text) => this.handleChange( 'email', text )}
                        />
                        <TextInput
                            placeholder='Password'
                            secureTextEntry={true}
                            underlineColorAndroid='#e6a400'
                            placeholderTextColor='#e3dac9'
                            value={this.state.name}
                            style={styles.inputField}
                            onChangeText={(text) => this.handleChange( 'password', text )}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Button style={styles.SignInButton} dark title='Login' onPress={() => this.handleSubmit()} >
                            <Text style={{color:'white'}}>Login</Text>
                        </Button>
                    </View>
                    
                </View>
                <View>{this.state.errorMessage ? <Text>{this.state.errorMessage}</Text> : <Text></Text> }</View>
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
        textAlign: 'center',
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
        width: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:5,
        backgroundColor: "#e6a400",
    },
    text :{
        color: '#01024e',
        fontSize: 15,
    },
})

export default LoginScreen