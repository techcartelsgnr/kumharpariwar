import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../theme/theme';
import StatusBarPage from '../../components/StatusBarPage';
import HeaderCommon from '../../components/HeaderCommon';
import { updateProfilePic } from '../../redux/slices/authSlice';
import ButtonWithBlue from '../../components/ButtonForLogin';
import InputField from '../../components/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token, mobile, name, email } = useSelector(state => state.auth);
  const { cities } = useSelector(state => state.reports);

  const [imageInfo, setImageInfo] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [alternetNumber, setAlternetNumber] = useState('');
  const [gotra, setGotra] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const cityOptions = cities.map(selectedCity => ({
    label: selectedCity.city,
    value: selectedCity.id,
  }));

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.assets && result.assets.length > 0) {
      const pickedImage = result.assets[0];

      setImageUri(pickedImage.uri); // For preview

      setImageInfo({
        uri: Platform.OS === 'ios' ? pickedImage.uri.replace('file://', '') : pickedImage.uri,
        type: pickedImage.type || 'image/jpeg',
        name: pickedImage.fileName || `photo_${Date.now()}.jpg`,
      });
    }
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();

    formData.append('alternate_number', alternetNumber);
    formData.append('gotra', gotra);
    formData.append('address', address);
    formData.append('state', state);
    formData.append('city', city);

    if (imageInfo) {
      formData.append('image', imageInfo);
    }

    try {
      const res = await dispatch(updateProfilePic({ token, formData })).unwrap();

      if (res.status_code == 200) {
        navigation.goBack();
        Toast.show({
          text1: res.message,
          type: 'success',
        });
      } else {
        Toast.show({
          text1: res.message,
          type: 'error',
        });
      }
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  const getProfilePic = async () => {
    try {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        const parsed = JSON.parse(userInfo);
        const user = parsed?.user || {};
        if (user?.image) setImageUri(user.image);
        setAddress(user.address || '');
        setAlternetNumber(user.alternate_number || '');
        setCity(user.city || '');
        setGotra(user.gotra || '');
        setState(user.state || '');
      }
    } catch (error) {
      console.log("Error loading profile info from storage", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePic();
    }, [])
  );

  const validCity = cityOptions.find(opt => opt.value === city);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
        <StatusBarPage />
        <HeaderCommon headername="Edit Profile" />
        <View style={{flex:1, backgroundColor:COLORS.white}}>


          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.editProfileform}>
              <View style={styles.profile}>
                <TouchableOpacity onPress={handleImagePick}>
                  <View style={styles.profileAvatarWrapper}>
                    {imageUri ? (
                      <Image
                        source={{ uri: imageUri }}
                        style={styles.profileAvatar}
                      />
                    ) : (
                      <View style={[styles.profileAvatar, { backgroundColor: '#ccc' }]} />
                    )}
                    <View style={styles.profileAction}>
                      <Feather color="#fff" name="edit-3" size={15} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.editProfileforminput}>
                <InputField
                  editable={false}
                  label={name}
                  icon={<Ionicons name="person-circle-outline" style={styles.editProfileformIcon} />}
                  keyboardType="default"
                />
              </View>
              <View style={styles.editProfileforminput}>
                <InputField
                  editable={false}
                  label={email}
                  icon={<Ionicons name="mail-unread-outline" style={styles.editProfileformIcon} />}
                  keyboardType="default"
                />
              </View>
              <View style={styles.editProfileforminput}>
                <InputField
                  editable={false}
                  label={mobile}
                  icon={<Ionicons name="call-outline" style={styles.editProfileformIcon} />}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.editProfileforminput}>
                <Dropdown
                  renderLeftIcon={() => (
                    <Ionicons name="location-outline" style={styles.dropdownIcon} />
                  )}
                  style={styles.dropdown}
                  data={cityOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Select City"
                  value={validCity ? city : null}
                  itemTextStyle={styles.dropdownTextStyle}
                  selectedTextStyle={styles.dropdownTextStyle}
                  placeholderStyle={styles.dropdownPlaceHolderStyle}
                  onChange={item => {
                    setCity(item.value);
                  }}
                />
              </View>

              <View style={styles.editProfileforminput}>
                <Dropdown
                  renderLeftIcon={() => (
                    <Ionicons name="location-outline" style={styles.dropdownIcon} />
                  )}
                  style={styles.dropdown}
                  data={[{ label: 'Rajasthan', value: 'Rajasthan' }]}
                  labelField="label"
                  valueField="value"
                  placeholder="Select State"
                  value={state}
                  itemTextStyle={styles.dropdownTextStyle}
                  selectedTextStyle={styles.dropdownTextStyle}
                  placeholderStyle={styles.dropdownPlaceHolderStyle}
                  onChange={item => {
                    setState(item.value);
                  }}
                />
              </View>

              <View style={styles.editProfileforminput}>
                <InputField
                  editable={true}
                  label={"Alternate Number"}
                  maxLength={10}
                  icon={<Ionicons name="call-outline" style={styles.editProfileformIcon} />}
                  value={alternetNumber}
                  keyboardType="numeric"
                  onChangeText={text => setAlternetNumber(text)}
                />
              </View>

              <View style={styles.editProfileforminput}>
                <InputField
                  editable={true}
                  label={"Gotra"}
                  maxLength={20}
                  icon={<MaterialCommunityIcons name="account" style={styles.editProfileformIcon} />}
                  value={gotra}
                  keyboardType="default"
                  onChangeText={text => setGotra(text)}
                />
              </View>

              <View style={styles.editProfileforminput}>
                <InputField
                  editable={true}
                  label={"Address"}
                  icon={<Ionicons name="location-outline" style={styles.dropdownIcon} />}
                  value={address}
                  keyboardType="default"
                  onChangeText={text => setAddress(text)}
                />
              </View>

              <View style={{ marginTop: 10 }}>
                <ButtonWithBlue text={'Save Changes'} onPress={handleUpdateProfile} />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  editProfileform: {
    margin: 15,
  },
  editProfileforminput: {
    marginBottom: 5,
  },
  editProfileformIcon: {
    color: COLORS.dark,
    fontSize: 22,
    marginRight: 5,
  },
  profile: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007bff',
  },
  dropdown: {
    width: '100%',
    borderColor: '#e1e1e3',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  dropdownIcon: {
    color: COLORS.dark,
    fontSize: 22,
    marginRight: 10,
  },
  dropdownTextStyle: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'ClashDisplay-Regular',
  },
  dropdownPlaceHolderStyle: {
    fontSize: 14,
    color: COLORS.placeholder,
    fontFamily: 'ClashDisplay-Regular',
  },
});
