/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { View, Text,TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Button } from 'native-base'
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

class SignUpScreen extends Component{
    constructor(props) {
        super(props)
        this.state = {
            SignUpForm: {},
            errorMessage: null,
            emailInputError: false,
        }
    }

    handleChange = (name, value) => {
        let newFormData = {...this.state.SignUpForm}
        newFormData[name] = value
        this.setState({
            SignUpForm: newFormData
        })
    }

    handleSubmit = async() => {
        if ( this.state.SignUpForm.email.length < 10 ) {
            Alert.alert('Error', 'email !')
            this.setState({
                emailInputError: true
            })
        } else if ( this.state.SignUpForm.password.length < 3 ) {
            Alert.alert('Error', 'Wrong password')
        } else {
            const data = this.state.SignUpForm
            await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(async (result) => {
                var userPro = firebase.auth().currentUser;
                userPro.updateProfile({ displayName: data.fullname, photoURL: data.photo })
                await firebase.database().ref('users/' + result.user.uid).set(data)
                    .then( () => {
                        this.props.navigation.navigate('Login')
                    })
            })
        }
    }


    render() {
        return(
            <View behavior="padding" style={styles.Wrapper}>
                <View style={styles.bodyWrapper}>
                    <View >
                        <Text style={styles.SignInTitle}>Create your{'\n'}MaChat now!</Text>
                    </View>
                    <View>
                        <TextInput 
                            placeholder='Full Name'
                            underlineColorAndroid='#207561'
                            placeholderTextColor='#e3dac9'
                            style={styles.inputField}
                            onChangeText={text => this.handleChange( 'fullname', text )}
                        />
                        <TextInput 
                            placeholder='Username'
                            underlineColorAndroid='#207561'
                            placeholderTextColor='#e3dac9'
                            style={styles.inputField}
                            onChangeText={text => this.handleChange( 'username', text )}
                        />
                        <TextInput
                            placeholder='Email'
                            underlineColorAndroid='#207561'
                            placeholderTextColor='#e3dac9'
                            keyboardType='email-address'
                            style={styles.inputField}
                            onChangeText={text => this.handleChange( 'email', text )}
                        />
                        <TextInput
                            placeholder='Password'
                            underlineColorAndroid='#207561'
                            placeholderTextColor='#e3dac9'
                            secureTextEntry={true}
                            style={styles.inputField}
                            onChangeText={text => this.handleChange( 'password', text )}
                        />
                        <TextInput 
                            placeholder='Photo (Url)'
                            underlineColorAndroid='#207561'
                            placeholderTextColor='#e3dac9'
                            style={styles.inputField}
                            onChangeText={text => this.handleChange( 'photo', text )}
                        />
                    </View>
                    <View style={{alignItems: 'flex-end'}}>
                        <Button style={styles.SignUpButton} dark title='SignUp' onPress={() => this.handleSubmit()} >
                            <Text style={{color:'white'}}>Sign Up</Text>
                        </Button>
                    </View>
                </View>
                <View style={styles.footerWrapper}>
                    <View style={{marginRight: 120}}>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')} >
                            <Text style={styles.text}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('ForgotPass')} >
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6a400'
    },
    bodyWrapper: {
        flex: 6,
        justifyContent: 'center',
    },
    footerWrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    SignInTitle: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#207561',
        paddingBottom: 50
    },
    inputField: {
        width: 280,
        color: 'gray',
        borderColor: 'gray',
        marginTop: 5
    },
    SignUpButton: {
        marginTop:10,
        marginRight: 20,
        height:45,
        width: 200,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:5 ,
        backgroundColor: "#207561",
    },
    text :{
        color: '#4B4C72',
        fontSize: 15,
    },
});

export default SignUpScreen