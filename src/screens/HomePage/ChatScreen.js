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
        const uidSender = this.state.uid
        const idReceiver = this.props.navigation.getParam('item')
            .then( (result) => {
                this.setState({
                    uid: AsyncStorage.getItem('uid'),
                    name: AsyncStorage.getItem('name'),
                    photo: AsyncStorage.getItem('photo')
                })
            })
        firebase.database().ref('messages').child(uidSender).child(idReceiver.uid)
            .on('child_added', (value) => {
                console.log('vale', value)
                let vall = value.val()
                vall._id = value.key
                this.setState((prevState) => {
                    return {
                        messageList: GiftedChat.append(prevState.messageList, vall)
                    }
                })
            })
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    handleSubmit = async () => {
        const nameSender = this.state.name
        const uidSender = this.state.uid
        const itemReceiver = this.props.navigation.getParam('item')

        let msgId = firebase.database().ref('messages').child(uidSender).child(this.state.idReceiver.uid).push().key
        let updates = {}
        let message = {
            _id: uidSender,
            text: this.state.textMessage,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            user: {
                _id: itemReceiver.uid,
                name: itemReceiver.name,
                avatar: itemReceiver.photo,
            },
        }
        updates['messages/' + uidSender + '/' + this.state.idReceiver.uid + '/' + msgId] = message
        updates['messages/' + this.state.idReceiver.uid + '/' + uidSender + '/' + msgId] = message
        firebase.database().ref().update(updates)
        this.setState({ textMessage: '' })
    }

    // renderRow = ({item}) => {
    //     console.log('rec', this.state.idReceiver)
    //     console.log('send', AsyncStorage.getItem('name'))
    //     return (
    //         <View>
    //             <Text>{item.from}</Text>
    //             <Text>{item.message}</Text>
    //         </View>
    //     )
    // }

    render() {
        console.log(this.state, 'state')
        
        return(
            // <SafeAreaView>
            //     <FlatList 
            //         data= {this.state.messageList}
            //         renderItem= {this.renderRow}
            //         keyExtractor= { (item, index) => index.toString()}
            //     />
            //     <TextInput 
            //         value={this.state.textMessage}
            //         onChangeText={ (text) => this.handleChange('textMessage', text)}
            //         placeholder='Type Message...'
            //     />
            //     <TouchableOpacity onPress={this.handleSubmit}>
            //         <Text>Send</Text>
            //     </TouchableOpacity>
            // </SafeAreaView>
            <GiftedChat 
                // text={}
                messages={this.state.messageList}
                onSend={messages => this.handleSubmit(messages)}
                user={{
                    _id: this.state.uid,
                    name: this.state.name,
                    avatar: this.state.photo,
                }}

            />
        )
    }
}

export default ChatScreen