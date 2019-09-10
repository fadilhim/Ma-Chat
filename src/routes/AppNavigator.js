/* eslint-disable prettier/prettier */
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import React from 'react' 
// import { Icon } from 'native-base'

//Splash Screen for loading
import AuthLoadingScreen from '../screens/AuthPage/AuthLoading'
import SplashScreen from '../screens/AuthPage/Splash'

//AuthPage (using switch Navigator)
import LoginScreen from '../screens/AuthPage/Login'
import SignUpScreen from '../screens/AuthPage/SignUp'

const AppNavigation = createSwitchNavigator(
    {
        AuthLoading: { screen: AuthLoadingScreen },
        Login: { screen: LoginScreen },
        SignUp: { screen: SignUpScreen },
        // Tabs: { screen: HomeTabNavigator }
    }
)

const InitialNavigation = createSwitchNavigator(
    {
        Splash: { screen: SplashScreen },
        App: { screen: AppNavigation }
    }
)

export default createAppContainer( InitialNavigation );