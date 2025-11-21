import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/theme';
import HeaderCommon from '../../components/HeaderCommon';
import { screenHeight, screenWidth } from '../../utils/constent';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { fetchListingBySubCatSlice } from '../../redux/slices/homeSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DirectoryContact({ route }) {

  const openDialer = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

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
      .catch((err) => console.error('Error opening WhatsApp:', err));
  };

  const dispatch = useDispatch();
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const { subcat_id, headerName } = route.params;

  const fetchContacts = async (page = 1, isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);

      const res = await dispatch(fetchListingBySubCatSlice({ subcat_id, page })).unwrap();
      const responseData = res.data.contacts;

      setLastPage(responseData.last_page);
      setCurrentPage(responseData.current_page);

      if (isRefresh) {
        setSubCategoryData(responseData.data);
      } else {
        setSubCategoryData(prev => [...prev, ...responseData.data]);
      }

    } catch (error) {
      console.log("Error fetching contact list:", error);
    } finally {
      setLoading(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setSubCategoryData([]);
      fetchContacts(1, true);
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    setSubCategoryData([]);
    fetchContacts(1, true);
  };

  const loadMore = () => {
    if (currentPage < lastPage && !loading) {
      fetchContacts(currentPage + 1);
    }
  };

  const renderLoader = () => {
    return currentPage < lastPage ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.dcontactsBox}>
      <View style={styles.dcontactsLists}>
        <View style={styles.dcontactLeft}>
          <Image
            source={{ uri: item.image }}
            style={styles.dcontactLeftImage}
          />
        </View>

        <View style={styles.dcontactRight}>
          <Text style={styles.dcontactPersonName}>{item.name}</Text>
          <Text style={styles.dcontactPostingName}>{item.designation}</Text>
          <Text style={styles.dcontactPostingName}>{item.location}</Text>

          <View style={styles.dcontactRightSocial}>
            <TouchableOpacity
              onPress={() => openDialer(item.call)}
              style={styles.dcontactSocialIcon}>
              <Ionicons name="call" style={styles.businessSubCatIcon} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openWhatsApp(item.call, 'I Found Your Number From Kumhar Pariwar App')}
              style={[styles.dcontactSocialIcon, { backgroundColor: COLORS.green }]}>
              <Ionicons name="logo-whatsapp" style={styles.businessSubCatIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const isEmpty = subCategoryData.length === 0 && !loading && !refreshing;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
      <HeaderCommon headername={headerName} />

      <View style={{ backgroundColor: '#eee', flex: 1 }}>
        {isEmpty ? (
          <View style={styles.centeredContainer}>
            <Text style={styles.noRecordText}>No Record Found</Text>
          </View>
        ) : (
          <FlatList
            data={subCategoryData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsVerticalScrollIndicator={true}
            ListFooterComponent={renderLoader}
            onEndReached={loadMore}
            onEndReachedThreshold={0.2}

            contentContainerStyle={{
              flexGrow: subCategoryData.length === 0 ? 1 : 0,
              paddingBottom:
                Platform.OS === 'android' ? screenHeight * 5 : screenHeight * 3,
            }}

            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    width: '20%',
  },
  dcontactLeftImage: {
    width: screenWidth * 15,
    height: screenWidth * 15,
    resizeMode: 'cover',
  },
  dcontactPersonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  dcontactPostingName: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  dcontactRight: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  dcontactRightSocial: {
    flexDirection: 'row',
    marginTop: 10,
    gap: screenWidth * 4,
  },
  dcontactSocialIcon: {
    backgroundColor: COLORS.primary,
    borderRadius: screenWidth * 2,
    padding: screenWidth * 1.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  businessSubCatIcon: {
    color: COLORS.white,
    fontSize: 14,
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  loaderContainer: {
    paddingVertical: 20,
  },
});
