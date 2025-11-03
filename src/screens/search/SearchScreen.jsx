import React, { useEffect, useState } from 'react';
import {
  
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Linking,
  ActivityIndicator,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

// api
import { useDispatch, useSelector } from 'react-redux';
import HeaderCommon from '../../components/HeaderCommon';
import { fetchSearchResults } from '../../redux/slices/MoreRepoSlice';
import ButtonWithBlue from '../../components/ButtonForLogin';
import InputField from '../../components/InputField';
import { COLORS } from '../../theme/theme';
import StatusBarPage from '../../components/StatusBarPage';
import { formstyles } from '../../components/FormsStyle';
import { fetchBusinessCategories } from '../../redux/slices/homePageSlice';
import { fetchSearchResultsSlice } from '../../redux/slices/homeSlice';
import { screenHeight, screenWidth } from '../../utils/constent';

import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const { allresults, pending, nextPageLink, cities } = useSelector(
    state => state.reports,
  );


  const openWhatsApp = (phoneNumber, message = '') => {
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          alert('WhatsApp is not installed on your device');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };



  const [searchData, setSearchData] = useState([])

  //const { businesscatArray } = useSelector(state => state.home);
  const { businesscatArray } = useSelector(state => {
    console.log("Redux home state:", state.home);
    return state.home;
  });
  console.log('business categories at 37', businesscatArray);


  const [city, setCity] = useState(null);
  const cityOptions = cities.map(selectedCity => ({
    label: selectedCity.city,
    value: selectedCity.id,
  }));

  const [category, setCategory] = useState(null);
  const categoryOptions = businesscatArray.map(cat => ({
    label: cat.name,
    value: cat.id,
  }));


  const handleSearchData = async ({ keyword, city_id, category_id, page = 1 }) => {
    if (!keyword.trim()) {
      setSearchData([]);
      return;
    }

    try {
      if (page === 1) {
        setSearchData([]); // Reset on new search
      } else {
        setLoadingMore(true);
      }

      const res = await dispatch(
        fetchSearchResultsSlice({ keyword, city_id, category_id, page })
      ).unwrap();

      console.log("search data print======>", res)

      const result = res.data.contacts;
      const newData = result.data || [];

      setSearchData(prev => (page === 1 ? newData : [...prev, ...newData]));
      setPage(result.current_page);
      setLastPage(result.last_page);
    } catch (error) {
      console.log('ERROR IN SEARCH ====>', error);
    } finally {
      setLoadingMore(false);
    }
  };



  useEffect(() => {
    if (keyword.trim() === '') {
      setSearchData([]);
    }
  }, [keyword]);




  const renderLoader = () => {
    return loadingMore ? (
      <View style={[styles.resultindiDataBox, { justifyContent: 'center' }]}>
        <ActivityIndicator size="small" color="#090979" />
      </View>
    ) : null;
  };

  const loadmoreItems = () => {
    if (page < lastPage && !loadingMore) {
      handleSearchData({
        keyword,
        city_id: city,
        category_id: category,
        page: page + 1,
      });
    }
  };


  // Render item
  const renderItem = ({ item }) => {
    return (
      <View style={styles.dcontactsBox}>
        <View style={styles.dcontactsLists}>
          <View style={styles.dcontactLeft}>
            <Image
              source={{
                uri: `https://kumharpariwar.com/storage/mycontacts/${item.image}`,
              }}
              style={styles.dcontactLeftImage}
            />
          </View>
          <View style={styles.dcontactRight}>
            <Text style={styles.dcontactPersonName}>{item.name}</Text>
            <View
              style={{
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: screenHeight * 0.4
              }}>
              <Text style={styles.dcontactPostingName}>
                {item.designation} - {item.location}
              </Text>
              <View style={styles.dcontactRightSocial}>
                <TouchableOpacity
                  style={styles.dcontactSocialIcon}
                  onPress={() => {
                    Linking.openURL(`tel:${item.call}`);
                  }}>
                  <Ionicons name="call" style={styles.businessSubCatIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.dcontactSocialIcon,
                    { backgroundColor: COLORS.green },
                  ]}
                  onPress={() => openWhatsApp(item.whatsapp, "app download")}>
                  <Ionicons
                    name="logo-whatsapp"
                    style={styles.businessSubCatIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>

      <StatusBarPage />
      <HeaderCommon headername="Search Contacts" />
      <View style={[styles.listingAllcontent, { backgroundColor: "#eee" }]}>
        <View style={{ marginHorizontal: 15, marginTop: 15 }}>
          <View style={styles.searchforminput}>
            <Dropdown
              renderLeftIcon={() => (
                <Ionicons
                  name="briefcase-outline"
                  style={styles.dropdownIcon}
                />
              )}
              style={styles.dropdown}
              data={categoryOptions}
              labelField="label"
              valueField="value"
              placeholder="Select Category"
              value={category}
              itemTextStyle={styles.dropdownTextStyle}
              selectedTextStyle={styles.dropdownTextStyle}
              placeholderStyle={styles.dropdownPlaceHolderStyle}
              onChange={item => {
                setCategory(item.value);
              }}
            />
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
            <InputField
              label={'Enter Keyword ...'}
              icon={<Ionicons name="search" style={formstyles.formIcon} />}
              keyboardType="default"
              onChangeText={text => {
                setKeyword(text);
              }}
            />
          </View>
          <ButtonWithBlue
            text={'Search Now'}
            onPress={() => {
              setPage(1);
              handleSearchData({
                keyword,
                city_id: city,
                category_id: category,
                page: 1
              });
            }}
          />

          {/* <ButtonWithBlue
            text={'Search Now'}
            onPress={() => {

              handleSearchData({
                keyword: keyword,
                city_id: city,
                category_id: category,
                page: 1
              });


              // dispatch(
              //   fetchSearchResults({
              //     token: token,
              //     keyword: keyword,
              //     city_id: city,
              //     category_id: category,
              //     isPressed: true,
              //   }),
              // );
            }
            }
          /> */}
        </View>
        {/* Searching list here */}
        <View style={{ flex: 1 }}>
          {pending && !allresults.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator
                size="large"
                color="#090979"
                animating={true}
                style={{
                  borderColor: '#fefefe',
                }}
              />
            </View>
          ) : searchData.length > 0 ? (
            <FlatList
              data={searchData}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              numColumns={1}
              showsVerticalScrollIndicator={true}
              ListFooterComponent={renderLoader}
              onEndReached={loadmoreItems}
              onEndReachedThreshold={0}
            />
          ) : (
            <View style={styles.recordFoundBox}>
              <Text style={styles.recordFoundText}>No Record Found</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  listingAllcontent: {
    flex: 1,
    paddingBottom: 10,
  },
  searchforminput: {
    marginBottom: 5,
  },
  dcontactsBox: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  dcontactsLists: {
    padding: 10,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  dcontactLeft: {
    width: '15%',
  },
  dcontactLeftImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
  },
  dcontactPersonName: {
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.dark,
    fontFamily: 'Roboto-Bold',
  },
  dcontactPostingName: {
    fontSize: 12,
    color: COLORS.dark,
    fontFamily: 'Hind-Medium',
  },
  dcontactRight: {
    paddingLeft: 10,
    width: '85%',
    gap: screenHeight * 0.5
  },
  dcontactRightSocial: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: screenWidth * 2
  },
  dcontactSocialIcon: {
    backgroundColor: COLORS.blue,
    padding: 5,
    // marginLeft: 8,
    borderRadius: 5,
  },
  businessSubCatIcon: {
    color: COLORS.white,
    fontSize: 14,
  },
  recordFoundBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  recordFoundText: {
    color: COLORS.dark,
    fontFamily: 'Baloo2-Bold',
    fontSize: 15,
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
