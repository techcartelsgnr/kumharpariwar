import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import HeaderCommon from '../../components/HeaderCommon';
import { COLORS } from '../../theme/theme';
import { fetchSubCategorySlice } from '../../redux/slices/homeSlice';
import navigationStrings from '../../utils/navigationStrings';
import { SafeAreaView } from 'react-native-safe-area-context';

const DirectoryLists = ({ route }) => {

  // ✅ FIX: early safe check (prevents hook order crash)
  if (!route?.params) return null;

  const { business_id, headerName } = route.params;

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Hooks ALWAYS at top
  const [categoryData, setCategoryData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSubCategoryByBusinessId = async () => {
    try {
      const res = await dispatch(fetchSubCategorySlice(business_id)).unwrap();
      setCategoryData(res.data.business_subcategory || []);
    } catch (error) {
      console.log("Error fetching category:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchSubCategoryByBusinessId();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchSubCategoryByBusinessId();
    }, [business_id])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
      <HeaderCommon headername={headerName} />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: '#eee' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.directoryBox}>
          {categoryData.map((item, index) => (
            <View key={index} style={styles.directoryList}>
              <TouchableOpacity
                style={styles.businessSubCatRow}
                onPress={() =>
                  navigation.navigate(navigationStrings.DIRECTORYCONTACTS, {
                    subcat_id: item.id,
                    headerName: item.title,
                  })
                }
              >
                <Text style={styles.businessSubCatRowLabel}>{item.title}</Text>
                <FeatherIcon name="chevron-right" style={styles.businessSubCatIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DirectoryLists;

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  businessSubCatRowLabel: {
    fontSize: 14,
    color: COLORS.dark,
    fontFamily: 'Baloo2-Bold',
  },
  businessSubCatIcon: {
    color: COLORS.blue,
    fontSize: 22,
  },
});
