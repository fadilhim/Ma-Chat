/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native'
import firebase from 'firebase'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'

import User from '../../assets/User';

class ChatScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uid: '',
            name: '',
            photo: '',
            idReceiver : props.navigation.getParam('item'),
            textMessage : '',
            messageList: []
        }
    }

    UNSAFE_componentWillMount = async () => {
        const itemReceiver = this.state.idReceiver
            this.setState({
                uid: await AsyncStorage.getItem('uid'),
                name: await AsyncStorage.getItem('name'),
                photo: await AsyncStorage.getItem('photo')
            })
        await firebase.database().ref('messages').child(this.state.uid).child(itemReceiver.uid)
            .on('child_added', (value) => {
                let vall = value.val()
                vall._id = value.key
                this.setState((prevState) => {
                    return {
                        messageList: GiftedChat.append(prevState.messageList, vall)
                    }
                })
            })
    }

    handleSubmit = () => {
        const uidSender = this.state.uid
        const itemReceiver = this.state.idReceiver

        let messageId = firebase.database().ref('messages').child(uidSender).child(this.state.idReceiver.uid).push().key
        let updates = {}
        let message = {
            _id: messageId,
            text: this.state.textMessage,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            user: {
                _id: this.state.uid,
                name: this.state.name,
                avatar: this.state.photo,
            },
        }
        updates['messages/' + uidSender + '/' + this.state.idReceiver.uid + '/' + messageId] = message
        updates['messages/' + this.state.idReceiver.uid + '/' + uidSender + '/' + messageId] = message
        firebase.database().ref().update(updates)
        this.setState({ textMessage: '' })
    }

    render() {
        return(
            <GiftedChat 
                text={this.state.textMessage}
                messages={this.state.messageList}
                onSend={this.handleSubmit}
                user={{
                    _id: this.state.uid,
                    name: this.state.name,
                    avatar: this.state.photo,
                }}
                onInputTextChanged={result => this.setState({textMessage: result})}
            />
        )
    }
}

export default ChatScreen