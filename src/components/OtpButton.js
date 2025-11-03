import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme/theme';

const OtpButton = ({isLoading, label, onPress, disabled}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7}>
      <View style={styles.loginBtn}>
        {!!isLoading ? (
          <ActivityIndicator size="large" color={COLORS.dark} />
        ) : (
          <View style={styles.loginBtnBox}>
            <Ionicons name="caret-forward-circle" style={styles.HederIcon} />
            <Text
              style={[
                styles.loginBtnText,
                {color: disabled ? '#7c001b' : '#10a600'},
              ]}>
              {' '}
              {label}{' '}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBtn: {
    textAlign: 'center',
  },
  loginBtnBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    fontFamily: 'Baloo2-Bold',
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HederIcon: {
    fontSize: 14,
    color: '#fefefe',
  },
});

export default OtpButton;
