import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerRoutesNavigation from './DrawerRoutesNavigation';
import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import SplashScreen from '../screens/splash/SplashScreen';
import ForgotPasswordScreen from '../screens/auth/forgotpassword/ForgotPasswordScreen';
import { navigationRef } from '../utils/NavigationUtil';

// 🔹 Create Stack
const Stack = createNativeStackNavigator();

// 🔹 Authentication Stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

// 🔹 Drawer Stack (After Login)
const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DrawerRoutesNavigation" component={DrawerRoutesNavigation} />
  </Stack.Navigator>
);

// 🔹 Main Root Navigator
const MainNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
    {/* ✅ Always start with SplashScreen */}
    <Stack.Screen name="SplashScreen" component={SplashScreen} />
    <Stack.Screen name="AuthStack" component={AuthStack} />
    <Stack.Screen name="AppStack" component={AppStack} />
  </Stack.Navigator>
);

// 🔹 Root Component
const AllRoutes = () => (
  <NavigationContainer ref={navigationRef}>
    <MainNavigator />
  </NavigationContainer>
);

export default AllRoutes;

const styles = StyleSheet.create({});
