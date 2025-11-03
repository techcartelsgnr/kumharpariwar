import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

export default function RegInputField({
  label,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChangeText,
  onBlur,
  isSecure,
  maxLength,
  editable,
  value,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 10,
      }}>
      <TextInput
        placeholder={label}
        placeholderTextColor="#969696"
        keyboardType={keyboardType}
        style={{
          flex: 1,
          paddingVertical: 0,
          color: '#000',
          fontFamily: 'Hind-Bold',
          fontSize: 13,
        }}
        secureTextEntry={isSecure}
        onChangeText={onChangeText}
        onBlur={onBlur}
        maxLength={maxLength}
        editable={editable}
        value={value}
      />
    </View>
  );
}
