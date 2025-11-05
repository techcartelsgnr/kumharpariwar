import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { useFocusEffect, useNavigation } from '@react-navigation/native';


// api
import { useDispatch, useSelector } from 'react-redux';
import HeaderCommon from '../../components/HeaderCommon';
import { COLORS } from '../../theme/theme';
import StatusBarPage from '../../components/StatusBarPage';
import { fetchSubCategory } from '../../redux/slices/homePageSlice';
import navigationStrings from '../../utils/navigationStrings';
import { fetchSubCategorySlice } from '../../redux/slices/homeSlice';

// Dummy data for directory list items
const dummyDirectoryData = [
  'Police',
  'Govt Jobs',
  'Patwar',
  'Rajasthan Police',
  'Commissioner',
  'Collector',
  'Cabinat Minister',
  'Minister',
  'Commissioner',
  'Commissioner',
  'Commissioner',
  'Commissioner',
  // Add more items as needed
];

const DirectoryLists = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { subCatArray, pending } = useSelector(state => state.home);
  const { business_id, headerName } = route.params;
  const [categoryData, setCategoryData] = useState([])
  console.log("business_id", business_id)

  const fetchSubCategoryByBusinessId = async () => {
    try {
      const res = await dispatch(fetchSubCategorySlice(business_id)).unwrap();
      console.log("response ====>", res)
      setCategoryData(res.data.business_subcategory)
    } catch (error) {

    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchSubCategoryByBusinessId()
    }, [])
  )



  return (
    <>
      {/* <StatusBarPage /> */}
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
        <HeaderCommon headername={headerName} />

        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#eee' }}>
          <View style={styles.directoryBox}>
            {categoryData.map((item, index) => {
              console.log("sub category ", item)
              return (
                <View key={index} style={styles.directoryList}>
                  <TouchableOpacity
                    style={styles.businessSubCatRow}
                    onPress={() => {
                      navigation.navigate(navigationStrings.DIRECTORYCONTACTS, {
                        subcat_id: item.id,
                        headerName: item.title,
                      });
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.businessSubCatRowLabel}>
                        {item.title}
                      </Text>
                    </View>
                    <View style={styles.businessSubCatPageSpacer} />
                    <FeatherIcon
                      name="chevron-right"
                      style={styles.businessSubCatIcon}
                    />
                  </TouchableOpacity>
                </View>
              )
            }

            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  directoryBox: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  directoryList: {
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginBottom: 10,
  },
  businessSubCatRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  businessSubCatRowLabel: {
    fontSize: 14,
    letterSpacing: 0.24,
    color: COLORS.dark,
    fontFamily: 'Baloo2-Bold',
  },
  // businessSubCatPageSpacer: {
  //   flexGrow: 1,
  //   flexShrink: 1,
  //   flexBasis: 0,
  // },
  businessSubCatIcon: {
    color: COLORS.blue,
    fontSize: 22,
  },
});

export default DirectoryLists;
