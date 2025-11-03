import React from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {COLORS} from '../theme/theme';

export default function InputField({
  label,
  icon,
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
        borderColor: '#e1e1e3',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 10,
      }}>
      {icon}
      <TextInput
        placeholder={label}
        placeholderTextColor={COLORS.placeholder}
        keyboardType={keyboardType}
        style={{
          flex: 1,
          paddingVertical: 0,
          color: '#000',
          fontFamily: 'ClashDisplay-Regular',
        }}
        secureTextEntry={isSecure}
        onChangeText={onChangeText}
        onBlur={onBlur}
        maxLength={maxLength}
        editable={editable}
        value={value}
      />
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{color: COLORS.dark, fontFamily: 'Hind-Medium'}}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
