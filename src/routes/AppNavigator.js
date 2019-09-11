/* eslint-disable prettier/prettier */
import React from 'react' 
import { Icon } from 'native-base'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

//Splash Screen for loading and authentication
import AuthLoadingScreen from '../screens/AuthPage/AuthLoading'
import SplashScreen from '../screens/AuthPage/Splash'

//AuthPage
import LoginScreen from '../screens/AuthPage/Login'
import SignUpScreen from '../screens/AuthPage/SignUp'

import HomeScreen from '../screens/HomePage/Home'
//HomePage screen
import ChatScreen from '../screens/HomePage/ChatScreen'
import ProfileScreen from '../screens/HomePage/Profile'
import LocationScreen from '../screens/HomePage/Location'

const HomeTabNavigator = createBottomTabNavigator(
    { 
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (  
                <Icon type="EvilIcons" name="comment" style={{fontSize:35 , color:`${tintColor}`}} />
                ),
                title: 'Chats'
            },
        },
        Location: {
            screen: LocationScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                <Icon type="EvilIcons" name="location" style={{fontSize:35, color:`${tintColor}`}}/>
                ),
                title: 'Location'
            },
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                <Icon type="EvilIcons" name="user" style={{fontSize:35, color:`${tintColor}`}}/>
                ),
                title: 'Profile'
            },
        },
    },{
        tabBarOptions: { 
            showIcon: true,
            activeTintColor: 'white',
            inactiveTintColor: '#999999',
            activeBackgroundColor: '#207561',
            inactiveBackgroundColor: '#207561'
        },
    }
)

const HomePage = createStackNavigator(
    {
        Home: { screen: HomeTabNavigator },
        Chat: { screen: ChatScreen },
    },{
        headerMode: "none",
    }
)

const AppNavigation = createSwitchNavigator(
    {
        AuthLoading: { screen: AuthLoadingScreen },
        Login: { screen: LoginScreen },
        SignUp: { screen: SignUpScreen },
        Tabs: { screen: HomePage }
    }
)

const InitialNavigation = createSwitchNavigator(
    {
        Splash: { screen: SplashScreen },
        App: { screen: AppNavigation }
    }
)

export default createAppContainer( InitialNavigation )