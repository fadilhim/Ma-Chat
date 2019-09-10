/* eslint-disable prettier/prettier */
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import React from 'react' 
import { Icon } from 'native-base'

//Splash Screen for loading and authentication
import AuthLoadingScreen from '../screens/AuthPage/AuthLoading'
import SplashScreen from '../screens/AuthPage/Splash'

//AuthPage
import LoginScreen from '../screens/AuthPage/Login'
import SignUpScreen from '../screens/AuthPage/SignUp'

//HomePage screen
import HomeScreen from '../screens/HomePage/Home'

const HomeTabNavigator = createBottomTabNavigator(
    { 
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (  
                <Icon type="AntDesign" name="home" style={{fontSize:30, color:`${tintColor}`}}/>
                ),
                title: 'Chats'
            },
        },
    },{
        tabBarOptions: { 
            showIcon: true,
            activeTintColor: '#4B4C72',
            inactiveTintColor: 'gray',
            showLabel: false
        },
    }
)

const AppNavigation = createSwitchNavigator(
    {
        AuthLoading: { screen: AuthLoadingScreen },
        Login: { screen: LoginScreen },
        SignUp: { screen: SignUpScreen },
        Tabs: { screen: HomeTabNavigator }
    }
)

const InitialNavigation = createSwitchNavigator(
    {
        Splash: { screen: SplashScreen },
        App: { screen: AppNavigation }
    }
)

export default createAppContainer( InitialNavigation )

    // History: {
    //     screen: HistoryScreen,
    //     navigationOptions: {
    //         tabBarIcon: ({ tintColor }) => (
    //         <Icon type="MaterialIcons" name="history" style={{fontSize:30, color:`${tintColor}`}}/>
    //         )
    //     },
    // },
    // Profile: {
    //     screen: ProfilePage,
    //     navigationOptions: {
    //         tabBarIcon: ({ tintColor }) => (
    //         <Icon type="EvilIcons" name="user" style={{fontSize:35, color:`${tintColor}`}}/>
    //         )
    //     },
    // },