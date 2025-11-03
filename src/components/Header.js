import React from 'react';
import {Text, View, TouchableOpacity, Share} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from '../components/Style';
import {useNavigation} from '@react-navigation/native';

// api
import {useDispatch, useSelector} from 'react-redux';
import navigationStrings from '../utils/navigationStrings';
import { screenHeight } from '../utils/constent';

const Header = () => {
  const navigation = useNavigation();
  const {name} = useSelector(state => state.auth);
  // get reffermessage api
  const {referMessage} = useSelector(state => state.reports);
  return (
    <View style={styles.headerbox}>
      <View style={styles.headerAlign}>
        <TouchableOpacity
          style={{paddingRight: 8,}}
          onPress={() => navigation.toggleDrawer()}>
          <Ionicons name="menu" style={styles.HederNotificationIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTopText}>Hi,</Text>
        <Text style={styles.headerText}>{name}</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={{paddingRight: 8}}
            onPress={() =>
              navigation.navigate(navigationStrings.NOTIFICATIONS)
            }>
            <Ionicons
              name="notifications"
              style={styles.HederNotificationIcon}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={{paddingRight: 8}}>
            <Ionicons name="logo-whatsapp" style={styles.HederWhatsappIcon} />
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={async () => await Share.share({message: referMessage})}>
            <Ionicons
              name="share-social-outline"
              style={styles.HederShareIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );  
};

export default Header;
