import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import InputField from '../../../components/InputField';
import ButtonWithBlue from '../../../components/ButtonForLogin';
import { COLORS } from '../../../theme/theme';
import { formstyles } from '../../../components/FormsStyle';
import commanServices from '../../../redux/services/commanServices';
import { getotp } from '../../../redux/slices/authSlice';
import navigationStrings from '../../../utils/navigationStrings';
import Toast from 'react-native-toast-message';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [refCode, setRefCode] = useState('');

  const isEmpty = () => {
    return !name.trim() || !email.trim() || !mobile.trim() || !password.trim();
  };

  const handleRegister = async () => {
    console.log('Register Button Clicked');
    console.log('name:', name);
    console.log('email:', email);
    console.log('mobile:', mobile);
    console.log('password:', password);
    console.log('refCode:', refCode);

    if (!isEmpty()) {
      try {
        const result = await dispatch(getotp({ email, mobile, password }));

        if (result.payload?.message === 'OTP Sent on Mobile') {
          navigation.navigate('OtpScreen', {
            name,
            email,
            mobile,
            password,
            refCode,
          });
        } else {
          Toast.show({
            text1:result.payload.errors,
            type:'error'
          })
          console.log('OTP sending failed:', result.payload);
        }
      } catch (error) {
        console.error('Registration error:', error);
        commanServices.showToast('Error during registration');
      }
    } else {
      commanServices.showToast('Text fields can not be Blank ✋');
      console.log('One or more fields are empty');
    }

    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} barStyle="default" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={formstyles.headerregister}>
          <Image
            source={require('../../../../assets/jpks_logo.png')}
            style={formstyles.registerPageHeaderImage}
          />
          <Text style={formstyles.RegisterTopText}>SignUp Here!</Text>
          <Text style={styles.registerText}>• कुम्हार परिवार •</Text>
        </View>
        <View style={formstyles.footer}>
          <InputField
            label={'Enter Your Name'}
            icon={<Ionicons name="person-circle-outline" style={formstyles.formIcon} />}
            keyboardType="default"
            onChangeText={setName}
          />
          <InputField
            label={'Enter Your Email'}
            icon={<Ionicons name="mail-unread-outline" style={formstyles.formIcon} />}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <InputField
            label={'Enter Mobile No.'}
            icon={<Ionicons name="call-outline" style={formstyles.formIcon} />}
            keyboardType="numeric"
            onChangeText={setMobile}
            maxLength={10}
          />
          <InputField
            label={'Enter PIN'}
            isSecure={true}
            icon={<Ionicons name="lock-open-outline" style={formstyles.formIcon} />}
            keyboardType="numeric"
            maxLength={4}
            onChangeText={setPassword}
          />
          <InputField
            label={'Referral Code'}
            icon={<Ionicons name="chatbox-ellipses-outline" style={formstyles.formIcon} />}
            keyboardType="default"
            onChangeText={setRefCode}
          />

          <View style={{ marginTop: 10 }}>
            <ButtonWithBlue
              text={'Register Now!'}
              onPress={handleRegister}
            />
          </View>

          <View style={{ marginVertical: 15, alignItems: 'center' }}>
            <Text style={formstyles.loginBottomHeading}>
              अगर आप पहले से रजिस्टर हैं तो लॉगिन करें।
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.LOGIN)}>
              <Text style={formstyles.loginBottomCompanyName}>Login Here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <LinearGradient
        colors={['#ff7800', '#fefefe', '#2fce00']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ height: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  registerText: {
    fontFamily: 'Baloo2-Medium',
    fontSize: 32,
    marginBottom: 10,
    color: COLORS.white,
  },
});

export default RegisterScreen;
