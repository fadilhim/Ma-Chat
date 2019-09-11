/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { SafeAreaView, Text, TextInput, TouchableOpacity, FlatList, View } from 'react-native'
import firebase from 'firebase'
import User from '../../assets/User';

class ChatScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            person: {
                name : props.navigation.getParam('name'),
                phone : props.navigation.getParam('phone')
            },
            textMessage : '',
            messageList: []
        }
    }

    UNSAFE_componentWillMount() {
        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
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
        if ( this.state.textMessage.length > 0 ) {
            let msgId = firebase.database().ref('messages').child(User.phone).child(this.state.person.phone).push().key
            let updates = {}
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.phone
            }
            updates['messages/' + User.phone + '/' + this.state.person.phone + '/' + msgId] = message
            updates['messages/' + this.state.person.phone + '/' + User.phone + '/' + msgId] = message
            firebase.database().ref().update(updates)
            this.setState({ textMessage: '' })
        }
    }

    renderRow = ({item}) => {
        return (
            <View>
                <Text>{item.from}</Text>
                <Text>{item.message}</Text>
            </View>
        )
    }

    render() {
        return(
            <SafeAreaView>
                <FlatList 
                    data= {this.state.messageList}
                    renderItem= {this.renderRow}
                    keyExtractor= { (item, index) => index.toString()}
                />
                <TextInput 
                    value={this.state.textMessage}
                    onChangeText={ (text) => this.handleChange('textMessage', text)}
                    placeholder='Type Message...'
                />
                <TouchableOpacity onPress={this.handleSubmit}>
                    <Text>Send</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    }
}

export default ChatScreen