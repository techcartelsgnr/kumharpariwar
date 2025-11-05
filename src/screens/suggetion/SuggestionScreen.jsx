import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import {formstyles} from '../components/FormsStyle';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
// api data
import {useDispatch, useSelector} from 'react-redux';

import { COLORS } from '../../theme/theme';
import { suggestions } from '../../redux/slices/authSlice';
import commanServices from '../../redux/services/commanServices';
import ButtonWithBlue from '../../components/ButtonForLogin';
import navigationStrings from '../../utils/navigationStrings';
import StatusBarPage from '../../components/StatusBarPage';
import HeaderCommon from '../../components/HeaderCommon';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Suggestion() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [suggestionBox, setSuggestionBox] = useState('');
  const {pending, token} = useSelector(state => state.auth);
  const seatOptions = [
    {id: 1, name: 'App Related Issue'},
    {id: 2, name: 'New Feature Suggestion'},
    {id: 3, name: 'New Contact Addition'},
  ];
  const isEmpty = () => {
    return selectedOption === '' || suggestionBox === '';
  };

  return (
    <>
      {/* <StatusBarPage /> */}
      <SafeAreaView
        style={{flex: 1, paddingBottom: 10, backgroundColor: COLORS.blue}}>
        <HeaderCommon headername="Suggestion Box" />
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: COLORS.white}}>
          <View style={{marginHorizontal: 15, marginTop: 15}}>
            <View style={styles.editProfileforminput}>
              <Dropdown
                data={seatOptions}
                labelField="name"
                valueField="id"
                placeholder="Select Options"
                value={selectedOption}
                onChange={item => {
                  setSelectedOption(item.id);
                }}
                itemTextStyle={{color: '#757575'}}
                style={styles.sofaDropdown}
                placeholderStyle={styles.SDDateTimeText}
                selectedTextStyle={styles.SDDateTimeText}
                dropdownPosition="bottom"
              />
            </View>
            <View style={styles.editProfileforminput}>
              <TextInput
                multiline={true}
                numberOfLines={15}
                placeholder="Description"
                placeholderTextColor={COLORS.dark}
                style={{
                  backgroundColor: '#f1f5f9',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                  borderRadius: 5,
                  justifyContent: 'flex-end',
                  height: 200,
                  textAlignVertical: 'top',
                  color: COLORS.dark,
                  fontFamily: 'Baloo2-Bold',
                }}
                keyboardType="default"
                onChangeText={text => {
                  setSuggestionBox(text);
                }}
              />
            </View>
            <View style={{marginTop: 10}}>
              <ButtonWithBlue
                text={'Submit Now'}
                isLoading={pending}
                onPress={() => {
                  if (isEmpty()) {
                    commanServices.showToast('Please Select All Fields...');
                    return;
                  }
                  dispatch(
                    suggestions({
                      token: token,
                      service_type: selectedOption,
                      suggestion: suggestionBox,
                    }),
                  ).then(x => {
                    if (x.payload.message === 'Suggestion Submitted.') {
                      navigation.goBack();
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

const styles = StyleSheet.create({
  editProfileforminput: {
    marginBottom: 5,
  },
  sofaDropdown: {
    width: '100%',
    backgroundColor: '#f1f5f9',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    fontFamily: 'Baloo2-Bold',
  },
  SDDateTimeText: {
    fontFamily: 'Baloo2-Bold',
    color: COLORS.dark,
    fontSize: 14,
    textTransform: 'capitalize',
  },
});
