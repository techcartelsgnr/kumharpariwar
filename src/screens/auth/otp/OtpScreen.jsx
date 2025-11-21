import React, { useState, useEffect } from 'react';
import { Text, View, StatusBar, Image, StyleSheet, Keyboard, Platform, PermissionsAndroid } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import messaging from '@react-native-firebase/messaging';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import OtpButton from '../../../components/OtpButton';
import ButtonWithBlue from '../../../components/ButtonForLogin';
import InputField from '../../../components/InputField';
import { COLORS } from '../../../theme/theme';
import commanServices from '../../../redux/services/commanServices';
import { formstyles } from '../../../components/FormsStyle';
import { register, ResendOtp } from '../../../redux/slices/authSlice';

import { fetchFCMToken } from '../../../utils/fservices';
import {
  getMessaging,
  requestPermission,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';


const OtpScreen = () => {
  const route = useRoute();
  const { name, email, mobile, password, refCode } = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [otp, setOtp] = useState('');
  const [remainingTime, setRemainingTime] = useState(60);

  const [fcmToken, setFcmToken] = useState('');

  const isEmpty = () => {
    return otp === '';
  };

  // Timer
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // ✅ Same FCM Token Logic added here
  useEffect(() => {
    (async () => {
      try {
        // Android 13+ Notification Permission
        if (Platform.OS === 'android' && Platform.Version >= 33) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
        }

        // Ask FCM Permission
        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          const token = await fetchFCMToken();
          console.log("🔥 OTP SCREEN FCM Token:", token);
          setFcmToken(token);
        } else {
          console.log("❌ Notification Permission Not Granted");
        }
      } catch (err) {
        console.log("FCM ERROR:", err);
      }
    })();
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={COLORS.blue} barStyle="default" />

      <LinearGradient colors={['#fefefe', '#fefefe']} style={formstyles.loginBtn}>
        <View style={formstyles.header}>
          <Image
            source={require('../../../../assets/jpks_logo.png')}
            style={formstyles.loginPageHeaderImage}
          />
          <Text style={formstyles.RegisterTopText}>Otp!</Text>
          <Text style={styles.registerText}>• कुम्हार परिवार •</Text>
        </View>

        <View style={formstyles.footer}>
          <InputField
            label={'Enter OTP'}
            isSecure={true}
            icon={<Ionicons name="chatbox-ellipses-outline" style={formstyles.formIcon} />}
            keyboardType="numeric"
            maxLength={6}
            onChangeText={text => setOtp(text)}
          />

          <View style={styles.timeOtpBox}>
            <Text style={styles.rtimesText}>Remaining - 00:{remainingTime} Sec</Text>

            <OtpButton
              label="Resend OTP"
              disabled={remainingTime > 0}
              onPress={() => {
                setRemainingTime(60);
                dispatch(ResendOtp({ mobile }));
              }}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <ButtonWithBlue
              text={'Verify Now'}
              onPress={() => {
                if (!isEmpty()) {


                  dispatch(
                    register({
                      name,
                      email,
                      mobile,
                      password,
                      refCode,
                      otp,
                      fcmToken,   // ✅ added
                    })
                  );
                } else {
                  commanServices.showToast('Text fields can not be Blank ✋');
                }
                Keyboard.dismiss();
              }}
            />
          </View>
        </View>
      </LinearGradient>

      <LinearGradient
        colors={['#ff7800', '#fefefe', '#2fce00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: 10 }}
      />
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  timeOtpBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rtimesText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 14,
    color: COLORS.dark,
  },
  registerText: {
    fontFamily: 'Baloo2-Medium',
    fontSize: 32,
    marginBottom: 10,
    color: COLORS.white,
  },
});
