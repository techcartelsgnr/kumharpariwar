import React from 'react';
import {Text, View, TouchableOpacity, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import { styles } from './Style';


const HeaderCommon = ({headername}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headercommonbox}>
      <View style={styles.headercommonAlign}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" style={styles.headercommonIcon} />
        </TouchableOpacity>
        <Text style={styles.headercommonText}>{headername}</Text>
      </View>
    </View>
  );
};

export default HeaderCommon;
