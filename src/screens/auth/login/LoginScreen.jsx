// Import necessary components and styles
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// Import custom components and theme
import InputField from '../../../components/InputField';
import ButtonForLogin from '../../../components/ButtonForLogin';
import {formstyles} from '../../../components/FormsStyle';
import {COLORS} from '../../../theme/theme';
import {useNavigation} from '@react-navigation/native';
// api calls here
import {useSelector, useDispatch} from 'react-redux';
import {fetchLogin} from '../../../redux/slices/authSlice';
import commanServices from '../../../redux/services/commanServices';
import navigationStrings from '../../../utils/navigationStrings';
const LoginScreen = () => {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const {pending} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleMobile = val => {
    setMobile(val);
  };
  const handlePassword = val => {
    setPassword(val);
  };
  const isEmpty = () => {
    if (mobile === '' || password === '') {
      return true;
    }
  };
  return (
    <View style={styles.container}>
      {/* Status bar */}
      <StatusBar backgroundColor={COLORS.blue} barStyle="default" />
      {/* Main content wrapped in ScrollView */}
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {/* Header section */}
        <View style={formstyles.header}>
          <Image
            source={require('../../../../assets/jpks_logo.png')}
            style={formstyles.loginPageHeaderImage}
          />
          <Text style={formstyles.RegisterTopText}>Login to Continue!</Text>
          <Text style={styles.registerText}>• कुम्हार परिवार •</Text>
        </View>

        {/* Footer section */}
        <View style={formstyles.footer}>
          {/* Input fields */}
          <InputField
            label={'Enter Mobile No.'}
            icon={<Ionicons name="call-outline" style={formstyles.formIcon} />}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={text => handleMobile(text)}
          />
          <InputField
            label={'Enter PIN'}
            isSecure={true}
            icon={<Ionicons name="key-outline" style={formstyles.formIcon} />}
            fieldButtonLabel={'Forgot PIN ?'}
            fieldButtonFunction={() => {
              navigation.navigate(navigationStrings.FORGOT);
            }}
            keyboardType="numeric"
            maxLength={4}
            onChangeText={text => handlePassword(text)}
          />

          {/* Login button */}
          <View style={{marginTop: 10}}>
            <ButtonForLogin
              text={'Login'}
              isLoading={pending}
              onPress={() => {
                if (!isEmpty()) {
                  dispatch(fetchLogin({mobile, password}));
                } else {
                  commanServices.showToast('Mobile and Pin can not be Blank');
                }
              }}
            />
          </View>

          {/* Register text */}
          <View style={{marginVertical: 15, alignItems: 'center'}}>
            <Text style={formstyles.loginBottomHeading}>
              अगर आप नए है इस App पर, तो रजिस्टर करें
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(navigationStrings.REGISTER)}>
              <Text style={formstyles.loginBottomCompanyName}>
                Register Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom gradient */}
      {/* <LinearGradient
        colors={['#ff7800', '#fefefe', '#2fce00']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{height: 10}}
      /> */}
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

export default LoginScreen;
