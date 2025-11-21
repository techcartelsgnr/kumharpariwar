import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputField from '../../../components/InputField';
import ButtonForLogin from '../../../components/ButtonForLogin';
import { formstyles } from '../../../components/FormsStyle';
import { COLORS } from '../../../theme/theme';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../../../redux/slices/authSlice';
import commanServices from '../../../redux/services/commanServices';
import navigationStrings from '../../../utils/navigationStrings';
import LinearGradient from 'react-native-linear-gradient';
import { fetchFCMToken } from '../../../utils/fservices';
import Toast from 'react-native-toast-message';
import {
  getMessaging,
  requestPermission,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { pending } = useSelector(state => state.auth);
  const [fcmToken, setFcmToken] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      }

      const messaging = getMessaging(getApp());
      const authStatus = await requestPermission(messaging);
      const enabled = authStatus === 1 || authStatus === 2;
      if (enabled) {
        const token = await fetchFCMToken();
        if (token) {
          setFcmToken(token);
          console.log('✅ Saved FCM Token:', token);
        }
      }
    })();
  }, []);
  // ✅ Separate handler function for login logic
  const handleLogin = async () => {
    if (mobile == "") {
      // Alert.alert("error", "validation error")

      commanServices.showToast('Mobile and Pin cannot be blank');
      return;
    }

    try {
      const res = await dispatch(fetchLogin({ mobile, password, fcmToken })).unwrap();
      console.log('res', res);

      // ✅ Check for error response from backend
      if (res.errors) {
        commanServices.showToast(res.errors); // Show Hindi error message
        return;
      }

      // ✅ Check if login is successful (if your API sends token or user info)
      if (res.status === true || res.token || res.user) {
        commanServices.showToast('Login successful!');
        navigation.replace(navigationStrings.HOME);
      } else {
        commanServices.showToast(res.message || 'Invalid login details');
      }
    } catch (error) {
      console.log('Login failed:', error);
      commanServices.showToast(error || 'Something went wrong, please try again');
    }
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} barStyle="default" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={formstyles.header}>
            <Image
              source={require('../../../../assets/jpks_logo.png')}
              style={formstyles.loginPageHeaderImage}
            />
            <Text style={formstyles.RegisterTopText}>Login to Continue!</Text>
            <Text style={styles.registerText}>• कुम्हार परिवार •</Text>
          </View>

          <View style={formstyles.footer}>
            <InputField
              label={'Enter Mobile No.'}
              icon={<Ionicons name="call-outline" style={formstyles.formIcon} />}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={setMobile}
            />

            <InputField
              label={'Enter PIN'}
              isSecure={true}
              icon={<Ionicons name="key-outline" style={formstyles.formIcon} />}
              fieldButtonLabel={'Forgot PIN ?'}
              fieldButtonFunction={() => navigation.navigate(navigationStrings.FORGOT)}
              keyboardType="numeric"
              maxLength={4}
              onChangeText={setPassword}
            />

            <View style={{ marginTop: 10 }}>
              <ButtonForLogin text={'Login'} isLoading={pending} onPress={handleLogin} />
            </View>

            <View style={{ marginVertical: 15, alignItems: 'center' }}>
              <Text style={formstyles.loginBottomHeading}>
                अगर आप नए है इस App पर, तो रजिस्टर करें
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.REGISTER)}>
                <Text style={formstyles.loginBottomCompanyName}>Register Here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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

export default LoginScreen;
