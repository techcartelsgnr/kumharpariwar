import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {useNavigation} from '@react-navigation/native';
  // api
  import {useDispatch} from 'react-redux';
import { formstyles } from '../../../components/FormsStyle';
import InputField from '../../../components/InputField';
import commanServices from '../../../redux/services/commanServices';
import { resetPassword } from '../../../redux/slices/authSlice';
import ButtonWithBlue from '../../../components/ButtonForLogin';
import navigationStrings from '../../../utils/navigationStrings';
import { COLORS } from '../../../theme/theme';
  
  const ResestPasswordScreen = ({route}) => {
    const navigation = useNavigation();
    const {mobile, otp} = route.params;
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const [confirmPassword, setConfirmPassword] = useState('');
    const isValid = () => {
      if (password.trim() == '' || confirmPassword.trim() == '') {
        commanServices.showToast('Please Fill All Fields...');
        return false;
      }
      if (password != confirmPassword) {
        commanServices.showToast('Password and Confirm Password should be same');
        return false;
      }
      console.log(otp);
      return true;
    };
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.blue} barStyle="default" />
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={formstyles.loginBtn}>
          <View style={formstyles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-circle"
                style={formstyles.headercommonIcon}
              />
            </TouchableOpacity>
            <Image
              source={require('../../../../assets/jpks_logo.png')}
              style={formstyles.loginPageHeaderImage}
            />
            <Text style={formstyles.RegisterTopText}>Reset Your Password!</Text>
            <Text style={styles.registerText}>• कुम्हार परिवार •</Text>
          </View>
          <View style={formstyles.footer}>
            <InputField
              label={'New PIN'}
              isSecure={true}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  style={formstyles.formIcon}
                />
              }
              keyboardType="numeric"
              maxLength={4}
              onChangeText={text => setPassword(text)}
            />
            <InputField
              label={'Confirm PIN'}
              isSecure={true}
              icon={
                <Ionicons
                  name="lock-closed-outline"
                  style={formstyles.formIcon}
                />
              }
              keyboardType="numeric"
              maxLength={4}
              onChangeText={text => setConfirmPassword(text)}
            />
            <View style={{marginTop: 10}}>
              <ButtonWithBlue
                text={'Submit Now'}
                onPress={() => {
                  if (isValid()) {
                    // API Call to reset password
                    dispatch(
                      resetPassword({
                        mobile: mobile,
                        otp: otp,
                        password: password,
                      }),
                    ).then(x => {
                      console.log(x);
                      if (x.payload.message === 'Password Changed') {
                        navigation.navigate(navigationStrings.LOGIN);
                      }
                    });
                  }
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
  
  export default ResestPasswordScreen;
  