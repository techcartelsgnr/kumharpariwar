import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// api
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../../theme/theme';
import { fetchSubCategory } from '../../redux/slices/homePageSlice';
import StatusBarPage from '../../components/StatusBarPage';
import HeaderCommon from '../../components/HeaderCommon';
import InputField from '../../components/InputField';
import ButtonWithBlue from '../../components/ButtonForLogin';
import { addContact } from '../../redux/slices/MoreRepoSlice';
import * as ImagePicker from 'react-native-image-picker';
import { fetchBusinessCategoriesSlice, fetchSubCategorySlice } from '../../redux/slices/homeSlice';
import { screenWidth } from '../../utils/constent';

export default function AddContactToDirectory() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { token, image } = useSelector(state => state.auth);
  const { businesscatArray } = useSelector(state => state.home);
  const { cities, error, pending } = useSelector(state => state.reports);

  const [name, setName] = useState('');
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [subCategory, setSubCategory] = useState(null);
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [categoryOptionsData, setCategoryOptionsData] = useState([])
  const DEFAULT_IMAGE_URL = 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740';

  const [imageUri, setImageUri] = useState(DEFAULT_IMAGE_URL);

  //const [imageUri, setImageUri] = useState('https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740');

  const data = new FormData();

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });

    if (result.assets && result.assets.length > 0) {
      const { uri } = result.assets[0];
      setImageUri(uri);
    }
  };


  const [city, setCity] = useState(null);
  const cityOptions = cities.map(selectedCity => ({
    label: selectedCity.city,
    value: selectedCity.id,
  }));

  const [category, setCategory] = useState(null);
  const categoryOptions = businesscatArray.map(cat => ({
    label: cat.name,
    value: cat.business_id
  }));

  const [gender, setGender] = useState(null);
  const genderOptions = [
    { label: 'Male', value: '0' },
    { label: 'Female', value: '1' },
    { label: 'Other', value: '2' },
  ];

  const handleCategoryChange = async item => {
    setCategory(item.value);
    setSubCategory(null);
    console.log('Category:-========> ', item);
    try {
      console.log('Item Business Id;', item.value);
      console.log('Item Value;', item.value);
      const response = await dispatch(fetchSubCategorySlice(item.value)).unwrap();
      console.log('Response////////////////////////////', response);
      const formattedSubCategories = response.data.business_subcategory.map(pickedSubCategory => ({
        label: pickedSubCategory.title,
        value: pickedSubCategory.id,
      }));
      setSubCategoryOptions(formattedSubCategories);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const res = await dispatch(fetchBusinessCategoriesSlice()).unwrap();
      console.log("reponse for all category===>", res)
      const categoryOptions = res.data.businesscategory.map(cat => ({
        label: cat.name,
        value: cat.id
      }));
      setCategoryOptionsData(categoryOptions)

    } catch (error) {
      console.log("ERRRO IN SEARCH ...", error)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchAllCategory()
  }, []))

  return (
    <>
      <StatusBarPage />
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
        <HeaderCommon headername="Add Contact to Directory" />
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.white }}>
          <View style={styles.editProfileform}>
            <View style={styles.profile}>
              <TouchableOpacity onPress={handleImagePick}>
                <View style={[styles.profileAvatarWrapper, { borderRadius: screenWidth * 10, }]}>
                  <Image
                    source={{ uri: imageUri }}
                    style={[{ width: screenWidth * 15, height: screenWidth * 15, borderWidth: 1, borderRadius: screenWidth * 10, }]}
                  />
                  <View style={styles.profileAction}>
                    <Feather color="#fff" name="edit-3" size={15} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.editProfileforminput}>
              <InputField
                label={'Enter Name'}
                value={name}
                onChangeText={setName}
                icon={
                  <Ionicons
                    name="person-circle-outline"
                    style={styles.editProfileformIcon}
                  />
                }
                keyboardType="default"
              />
            </View>
            <View style={styles.editProfileforminput}>
              <Dropdown
                renderLeftIcon={() => (
                  <Ionicons name="male-female" style={styles.dropdownIcon} />
                )}
                style={styles.dropdown}
                data={genderOptions}
                labelField="label"
                valueField="value"
                placeholder="Select Gender"
                value={gender}
                itemTextStyle={styles.dropdownTextStyle}
                selectedTextStyle={styles.dropdownTextStyle}
                placeholderStyle={styles.dropdownPlaceHolderStyle}
                onChange={item => {
                  setGender(item.value);
                }}
              />
            </View>
            <View style={styles.editProfileforminput}>
              <InputField
                value={designation}
                label={'Enter Designation'}
                onChangeText={setDesignation}
                icon={
                  <Ionicons
                    name="mail-unread-outline"
                    style={styles.editProfileformIcon}
                  />
                }
                keyboardType="default"
              />
            </View>
            <View style={styles.editProfileforminput}>
              <InputField
                value={mobile}
                maxLength={10}
                onChangeText={setMobile}
                label={'Enter Mobile Number'}
                icon={
                  <Ionicons
                    name="call-outline"
                    style={styles.editProfileformIcon}
                  />
                }
                keyboardType="numeric"
              />
            </View>
            <View style={styles.editProfileforminput}>
              <Dropdown
                renderLeftIcon={() => (
                  <Ionicons
                    name="location-outline"
                    style={styles.dropdownIcon}
                  />
                )}
                style={styles.dropdown}
                data={cityOptions}
                labelField="label"
                valueField="value"
                placeholder="Select City"
                value={city}
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
                  <Ionicons
                    name="briefcase-outline"
                    style={styles.dropdownIcon}
                  />
                )}
                style={styles.dropdown}
                data={categoryOptionsData}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                value={category}
                itemTextStyle={styles.dropdownTextStyle}
                selectedTextStyle={styles.dropdownTextStyle}
                placeholderStyle={styles.dropdownPlaceHolderStyle}
                onChange={handleCategoryChange}
              />
            </View>
            {subCategoryOptions.length > 0 && (
              <View style={styles.editProfileforminput}>
                <Dropdown
                  renderLeftIcon={() => (
                    <Ionicons
                      name="bag-add-outline"
                      style={styles.dropdownIcon}
                    />
                  )}
                  style={styles.dropdown}
                  data={subCategoryOptions}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Subcategory"
                  value={subCategory}
                  itemTextStyle={styles.dropdownTextStyle}
                  selectedTextStyle={styles.dropdownTextStyle}
                  placeholderStyle={styles.dropdownPlaceHolderStyle}
                  onChange={item => {
                    setSubCategory(item.value);
                  }}
                />
              </View>
            )}

            <View style={{ marginTop: 10 }}>
              <ButtonWithBlue
                text={'Save Contact'}
                onPress={async () => {
                  if (!pending) {
                    const formData = new FormData();

                    formData.append('name', name || '');
                    formData.append('gender', gender || '');
                    formData.append('designation', designation || '');
                    formData.append('mobile', mobile || '');
                    formData.append('location', city || '');
                    formData.append('category', category || '');
                    formData.append('subcategory', subCategory || '');

                    // ✅ Check if user uploaded a new image (not the default)
                    if (imageUri && imageUri !== DEFAULT_IMAGE_URL) {
                      const filename = imageUri.split('/').pop();
                      const match = /\.(\w+)$/.exec(filename);
                      const type = match ? `image/${match[1]}` : 'image/jpeg';

                      formData.append('image', {
                        uri: imageUri,
                        type: type,
                        name: filename,
                      });
                    } else {
                      // No image selected → send empty string
                      formData.append('image', '');
                    }

                    console.log('Form-Data:', formData);

                    const response = await dispatch(addContact({ token, data: formData }));

                    if (response.payload?.erors) {
                      console.log('Execution Done With Error', pending, error);
                    }

                    if (response.payload?.message) {
                      console.log('Execution Done Without Error', pending, error);
                      navigation.goBack();
                    }
                  }
                }}
              />

            </View>
          </View>
        </ScrollView>
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
    borderRadius: 36, // Use half of width and height to get a circular shape
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
