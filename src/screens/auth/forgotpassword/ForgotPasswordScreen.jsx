import {
    Text,
    View,
    StatusBar,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {useNavigation} from '@react-navigation/native';
  // api
  import {useDispatch} from 'react-redux';
import { formstyles } from '../../../components/FormsStyle';
import InputField from '../../../components/InputField';
import { COLORS } from '../../../theme/theme';
import ButtonWithBlue from '../../../components/ButtonForLogin';
import commanServices from '../../../redux/services/commanServices';
import { ResendOtp } from '../../../redux/slices/authSlice';
import navigationStrings from '../../../utils/navigationStrings';
  
  const ForgotPasswordScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [mobile, setMobile] = useState('');
    const [remainingTime, setRemainingTime] = useState(60);
    const [on, setOn] = useState(false);
    const [otp, setOtp] = useState('');
  
    useEffect(() => {
      var intervalId = 0;
      if (on) {
        intervalId = setInterval(() => {
          setRemainingTime(prevTime => Math.max(0, prevTime - 1));
        }, 1000);
      }
  
      return () => clearInterval(intervalId);
    }, [on]);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.blue} barStyle="default" />
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={formstyles.header}>
            <Image
              source={require('../../../../assets/jpks_logo.png')}
              style={formstyles.loginPageHeaderImage}
            />
            <Text style={formstyles.RegisterTopText}>Forgot Password!</Text>
            <Text style={styles.registerText}>• कुम्हार परिवार •</Text>
          </View>
          <View style={formstyles.footer}>
            <InputField
              label={'Enter Mobile No.'}
              icon={<Ionicons name="call-outline" style={formstyles.formIcon} />}
              keyboardType="numeric"
              onChangeText={text => setMobile(text)}
            />
            <InputField
              label={'Enter OTP'}
              isSecure={true}
              icon={
                <Ionicons
                  name="chatbox-ellipses-outline"
                  style={formstyles.formIcon}
                />
              }
              onChangeText={text => {
                setOtp(text);
              }}
              fieldButtonLabel={on ? 'Resend OTP' : 'get OTP ?'}
              fieldDisabled={
                on && remainingTime === 0 ? false : !on ? false : true
              }
              keyboardType="default"
              fieldButtonFunction={() => {
                if (mobile === '') {
                  commanServices.showToast('Please Fill Mobile No.');
                  return;
                }
                setRemainingTime(60);
                setOn(true);
                dispatch(ResendOtp({mobile}));
              }}
            />
            <View style={formstyles.timeOtpBox}>
              <View>
                <Text style={formstyles.rtimesText}>
                  {remainingTime > 0 &&
                    remainingTime < 60 &&
                    ` Remaining -00:${remainingTime} Sec`}
                </Text>
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <ButtonWithBlue
                text={'Next'}
                onPress={() => {
                  if (mobile === '' || otp === '') {
                    commanServices.showToast('Please Fill All Fields');
                    return;
                  }
                  navigation.navigate(navigationStrings.RESETPASSWORD, {
                    mobile: mobile,
                    otp: otp,
                  });
                }}
              />
            </View>
          </View>
        </ScrollView>
        <LinearGradient
          colors={['#ff7800', '#fefefe', '#2fce00']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{height: 10}}></LinearGradient>
      </View>
    );
  };
  
  // Styles using StyleSheet
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white, // Assuming white is defined in your theme
    },
    registerText: {
      fontFamily: 'Baloo2-Medium',
      fontSize: 32,
      marginBottom: 10,
      color: COLORS.white,
    },
  });
  
  export default ForgotPasswordScreen;
  