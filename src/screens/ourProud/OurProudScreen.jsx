import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,

} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import StatusBarPage from '../../components/StatusBarPage';
import HeaderCommon from '../../components/HeaderCommon';
import { COLORS } from '../../theme/theme';
import { fetchOurProudSlice } from '../../redux/slices/homeSlice';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function OurProud() {
  const dispatch = useDispatch();
  const [proudData, setProudData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOurProudData = async (page = 1, isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);

      const res = await dispatch(fetchOurProudSlice(page)).unwrap();
      const responseData = res.data.prouds;

      setLastPage(responseData.last_page);
      setCurrentPage(responseData.current_page);

      if (isRefresh) {
        setProudData(responseData.data);
      } else {
        setProudData(prev => [...prev, ...responseData.data]);
      }
    } catch (error) {
      console.log("ERROR IN FETCH OUR PROUD DATA", error);
    } finally {
      if (isRefresh) setRefreshing(false);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setProudData([]);
      fetchOurProudData(1, true);
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    setProudData([]);
    fetchOurProudData(1, true);
  };

  const loadmoreItems = () => {
    if (currentPage < lastPage && !loading) {
      const nextPage = currentPage + 1;
      fetchOurProudData(nextPage);
    }
  };

  const renderLoader = () => {
    return currentPage < lastPage ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="red" />
      </View>
    ) : null;
  };

  // Render proud items
  const renderItem = ({ item }) => {
    // console.log("our proud item", item)
    return (

      <View style={styles.ourProudsBox}>
        <View style={styles.ourProudsLists}>
          <View style={styles.ourProudLeft}>
            <Image
              source={{ uri: item.image }}
              // source={{
              //   uri: item.image
              //     ? `https://kumharpariwar.com/storage/proud/${item.image}`
              //     : 'https://via.placeholder.com/100',
              // }}
              style={styles.ourProudLeftImage}
            />
            <Text
              style={styles.ourProudDesription}
              numberOfLines={3}
              ellipsizeMode="tail">
              {item.desp || 'Description not available'}
            </Text>
          </View>
          <View style={styles.ourProudRight}>
            <View style={styles.ourProudtRightSection}>
              <Text style={styles.ourProudPostText}>नाम :- </Text>
              <View style={styles.ourProudBorder} />
              <Text style={styles.ourProudPersonName}>
                {item.name || 'Name not available'}
              </Text>
            </View>
            <View style={styles.ourProudtRightSection}>
              <Text style={styles.ourProudPostText}>पद :- </Text>
              <View style={styles.ourProudBorder} />
              <Text style={styles.ourProudPersonName}>
                {item.designation || 'Designation not available'}
              </Text>
            </View>
            <View style={styles.ourProudtRightSection}>
              <Text style={styles.ourProudPostText}>ईमेल :- </Text>
              <View style={styles.ourProudBorder} />
              <Text style={styles.ourProudPersonName}>
                {item.email || 'Email not available'}
              </Text>
            </View>
            <View style={styles.ourProudtRightSection}>
              <Text style={styles.ourProudPostText}>संपर्क नंबर :- </Text>
              <View style={styles.ourProudBorder} />
              <Text style={styles.ourProudPersonName}>
                {item.call || 'Contact number not available'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <StatusBarPage backgroundColor={COLORS.blue} /> */}
      <HeaderCommon headername="Our Prouds" />

      <View style={[styles.listingAllcontent, { backgroundColor: COLORS.white }]}>
        {loading && proudData.length === 0 ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator size="large" color="red" style={styles.activityIndicator} />
          </View>
        ) : proudData.length > 0 ? (
          <FlatList
            data={proudData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsVerticalScrollIndicator={false}
            onEndReached={loadmoreItems}
            onEndReachedThreshold={0.2}
            ListFooterComponent={loading ? renderLoader : null}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <View style={styles.centeredContainer}>
            <Text style={styles.noRecordText}>No Record Found</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.blue
  },
  listingAllcontent: {
    flex: 1,
    marginBottom: 50
  },
  ourProudsBox: {
    marginHorizontal: 10,
    marginTop: 10,

  },
  ourProudsLists: {
    padding: 10,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    borderRadius: 10,
  },
  ourProudLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ourProudLeftImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  ourProudRight: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.gray,
    borderRightWidth: 1,
    borderRightColor: COLORS.gray,
  },
  ourProudtRightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,

  },
  ourProudPostText: {
    width: '22%',
    fontSize: 13,
    lineHeight: 18,
    paddingLeft: 5,
    color: COLORS.dark,
    fontFamily: 'Roboto-Bold',
  },
  ourProudDesription: {
    fontSize: 12,
    lineHeight: 16,
    color: COLORS.dark,
    fontFamily: 'Roboto-Bold',
    paddingLeft: 10,
    width: '70%',
  },
  ourProudPersonName: {
    fontSize: 13,
    lineHeight: 18,
    color: COLORS.dark,
    fontFamily: 'Roboto-Bold',
  },
  ourProudBorder: {
    height: '100%',
    width: 1,
    backgroundColor: COLORS.gray,
    marginHorizontal: 10,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  activityIndicator: {
    borderColor: '#fefefe',
  },
  noRecordText: {
    color: COLORS.blue,
    fontFamily: 'Baloo2-Bold',
    fontSize: 14,
  },
  loaderContainer: {
    justifyContent: 'center',
  },
});
