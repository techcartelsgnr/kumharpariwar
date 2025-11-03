import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../theme/theme';

const ButtonWithBlue = ({isLoading, text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.loginBtn}>
        {!!isLoading ? (
          <ActivityIndicator size="large" color="#white" />
        ) : (
          <Text style={styles.loginBtnText}>{text}</Text>
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
    backgroundColor: COLORS.darkblue,
    paddingVertical: 15,
    paddingHorizontal: 15,
    textAlign: 'center',
    borderRadius: 5,
    width: '100%',
  },
  loginBtnText: {
    textAlign: 'center',
    color: '#fefefe',
    fontFamily: 'Baloo2-Medium',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default ButtonWithBlue;
