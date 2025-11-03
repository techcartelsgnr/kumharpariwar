import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import DrawerRoutesNavigation from './DrawerRoutesNavigation';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../utils/NavigationUtil';
import ForgotPasswordScreen from '../screens/auth/forgotpassword/ForgotPasswordScreen';







// Navigators
const Stack = createNativeStackNavigator();
// Auth Stack
const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </Stack.Navigator>
)

// Drawer Navigator
const NoAuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, }}>
            <Stack.Screen name='DrawerRoutesNavigation' component={DrawerRoutesNavigation} />
        </Stack.Navigator>
    )
}

// Main Navigation
const MainNavigator = () => {
    return (

        <Stack.Navigator screenOptions={{ headerShown: false, }}>
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="NoAuthStack" component={NoAuthStack} />
            <Stack.Screen name="SplaceScreen" component={SplashScreen} />
        </Stack.Navigator>
    )
}


const AllRoutes = () => {
    return (

        <NavigationContainer ref={navigationRef}>
            <MainNavigator />
        </NavigationContainer>
    )

}

export default AllRoutes

const styles = StyleSheet.create({})