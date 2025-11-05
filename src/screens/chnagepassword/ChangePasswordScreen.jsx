import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// api
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';
import navigationStrings from '../../utils/navigationStrings';
import commanServices from '../../redux/services/commanServices';
import ButtonWithBlue from '../../components/ButtonForLogin';
import StatusBarPage from '../../components/StatusBarPage';
import HeaderCommon from '../../components/HeaderCommon';
import { COLORS } from '../../theme/theme';
import InputField from '../../components/InputField';
import { changePassword } from '../../redux/slices/authSlice';
import { formstyles } from '../../components/FormsStyle';


export default function ChangePassword() {
  const [pin, setPin] = useState({ new_pin: '', old_pin: '', confirm_pin: '' });
  const { token, pending } = useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isEmpty = () => {
    if (
      pin.new_pin.trim() === '' ||
      pin.old_pin.trim() === '' ||
      pin.confirm_pin.trim() === ''
    ) {
      return true;
    }
    return false;
  };
  const isValid = () => {
    if (pin.new_pin === pin.confirm_pin) {
      return true;
    }
    return false;
  };
  return (
    <>
      {/* <StatusBarPage /> */}
      <SafeAreaView
        style={{ flex: 1, paddingBottom: 10, backgroundColor: COLORS.blue }}>
        <HeaderCommon headername="Change Password" />
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.white }}>
          <View style={{ marginHorizontal: 15, marginTop: 15 }}>
            <View>
              <InputField
                label={'Enter Old PIN'}
                isSecure={true}
                icon={
                  <Ionicons
                    name="lock-open-outline"
                    style={formstyles.formIcon}
                  />
                }
                keyboardType="numeric"
                maxLength={4}
                onChangeText={text => {
                  setPin({ ...pin, old_pin: text });
                }}
              />
            </View>
            <View>
              <InputField
                label={'Enter New PIN'}
                isSecure={true}
                icon={
                  <Ionicons name="lock-closed" style={formstyles.formIcon} />
                }
                keyboardType="numeric"
                maxLength={4}
                onChangeText={text => {
                  setPin({ ...pin, new_pin: text });
                }}
              />
            </View>
            <View>
              <InputField
                label={'Confrim PIN'}
                isSecure={true}
                icon={
                  <Ionicons name="lock-closed" style={formstyles.formIcon} />
                }
                keyboardType="numeric"
                maxLength={4}
                onChangeText={text => {
                  setPin({ ...pin, confirm_pin: text });
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <ButtonWithBlue
                text={'Submit Now'}
                isLoading={pending}
                onPress={() => {
                  if (isEmpty()) {
                    commanServices.showToast('Please Fill All Fields...');
                    return;
                  }
                  if (!isValid()) {
                    commanServices.showToast(
                      'New Password and Confirm Password does not match...',
                    );
                    return;
                  }
                  dispatch(
                    changePassword({
                      token: token,
                      new_pin: pin.new_pin,
                      old_pin: pin.old_pin,
                    }),
                  ).then(x => {
                    if (x.payload.message === 'Pin Updated') {
                      navigation.navigate(navigationStrings.HOME);
                    }
                  });
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
