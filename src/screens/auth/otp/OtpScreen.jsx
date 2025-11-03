import React, {useState, useEffect} from 'react';
import {Text, View, StatusBar, Image, StyleSheet, Keyboard} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';



import {useNavigation, useRoute} from '@react-navigation/native';
// api
import {useDispatch} from 'react-redux';
import OtpButton from '../../../components/OtpButton';
import ButtonWithBlue from '../../../components/ButtonForLogin';
import InputField from '../../../components/InputField';
import { COLORS } from '../../../theme/theme';
import commanServices from '../../../redux/services/commanServices';
import { formstyles } from '../../../components/FormsStyle';
import { register, ResendOtp } from '../../../redux/slices/authSlice';

const OtpScreen = () => {
  const route = useRoute();
  const {name, email, mobile, password, refCode} = route.params;
  const [remainingTime, setRemainingTime] = useState(60);
  const [resetTime, setResetTime] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState('');
  const isEmpty = () => {
    if (otp === '') {
      return true;
    }
  };

  function calculateSlot() {
    const now = new Date();
    const totalMinutes = now.getHours() * 60 + now.getMinutes();
    return Math.floor(totalMinutes / 1);
  }

  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextMultipleOfOne, setNextMultipleOfOne] = useState(new Date());
  ////////////////////////////////////
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(prevTime => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(intervalId); // Clear timer on unmount
  }, [resetTime]);
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={COLORS.blue} barStyle="default" />
      <LinearGradient
        colors={['#fefefe', '#fefefe']}
        style={formstyles.loginBtn}>
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
            icon={
              <Ionicons
                name="chatbox-ellipses-outline"
                style={formstyles.formIcon}
              />
            }
            keyboardType="numeric"
            maxLength={6}
            onChangeText={text => {
              setOtp(text);
            }}
          />
          <View style={styles.timeOtpBox}>
            <View>
              <Text style={styles.rtimesText}>
                Remaining -00:{remainingTime} Sec
                {/* Remaining  - {formattedDifference} Sec */}
              </Text>
            </View>
            <View>
              <OtpButton
                label="Resend OTP"
                disabled={remainingTime > 0 ? true : false}
                onPress={() => {
                  setRemainingTime(60);
                  // setResetTime(pre => !pre);
                  dispatch(ResendOtp({mobile}));
                }}
              />
            </View>
          </View>
          <View style={{marginTop: 10}}>
            <ButtonWithBlue
              text={'Verify Now'}
              onPress={() => {
                if (!isEmpty()) {
                  dispatch(
                    register({name, email, mobile, password, refCode, otp}),
                  );
                } else {
                  commanServices.showToast('Text fields can not be Blank ✋');
                }
                Keyboard.dismiss;
              }}
            />
          </View>
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['#ff7800', '#fefefe', '#2fce00']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{height: 10}}></LinearGradient>
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
  resendOtpText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 14,
    color: COLORS.darkblue,
  },
  registerText: {
    fontFamily: 'Baloo2-Medium',
    fontSize: 32,
    marginBottom: 10,
    color: COLORS.white,
  },
});
