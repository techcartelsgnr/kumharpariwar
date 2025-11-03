import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/login/LoginScreen';
import RegisterScreen from '../screens/auth/register/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/forgotpassword/ForgotPasswordScreen';
import navigationStrings from '../utils/navigationStrings';
import OtpScreen from '../screens/auth/otp/OtpScreen';
import ResestPasswordScreen from '../screens/auth/resetpassword/ResestPasswordScreen';


const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Screen name={navigationStrings.LOGIN} component={LoginScreen} />
      <Stack.Screen name={navigationStrings.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={navigationStrings.FORGOT} component={ForgotPasswordScreen} />
      <Stack.Screen name={navigationStrings.OTPSCREEN} component={OtpScreen} />
      <Stack.Screen name={navigationStrings.RESETPASSWORD} component={ResestPasswordScreen} />
      {/* <Stack.Screen name={navigationStrings.OTPSCREEN} component={OtpScreen} 
      
      /> */}
      {/* <Stack.Screen
        name={navigationStrings.RESETPASSWORD}
        component={ResetPassword}
      /> */}
    </>
  );
};

export default AuthStack;