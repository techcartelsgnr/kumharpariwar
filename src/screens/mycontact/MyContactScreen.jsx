import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMycontacts, resetContactsList } from '../../redux/slices/MoreRepoSlice';
import StatusBarPage from '../../components/StatusBarPage';
import HeaderCommon from '../../components/HeaderCommon';
import { COLORS } from '../../theme/theme';

export default function MyContactScreen() {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const {
    pending,
    allContacts = [],
    nextPageContactListing,
  } = useSelector(state => state.reports);

  useEffect(() => {
    onRefresh();
  }, []);

  const onRefresh = () => {
    dispatch(resetContactsList())
    dispatch(fetchMycontacts({ token }));
  };

  const renderLoader = () => {
    return nextPageContactListing !== null ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={20} color={"red"} />
      </View>
    ) : null;
  };

  const loadmoreItems = () => {
    if (nextPageContactListing !== null) {
      dispatch(fetchMycontacts({ token }));
    }
  };

  const renderItem = ({ item }) => {
    const name = item.name || '';
    const category = item.business_categories_name || '';
    const subCategory = item.business_sub_categories_name || '';
    const designation = item.designation || '';
    const call = item.call || '';
    const gender =
      item.gender === '0' ? 'Male' : item.gender === '1' ? 'Female' : 'Other';
    const imageUrl = item.image;


    return (
      <View style={styles.newsSection}>
        <View style={styles.newsTopSection}>
          <View style={styles.newsLeft}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.newsImage} />
            ) : (
              <View style={styles.newsImage} />
            )}
          </View>
          <View style={styles.newsRight}>
            <Text numberOfLines={1} style={styles.newsCateLabel}>
            Name:   {name}
            </Text>
            <Text style={styles.newsCateLabel} numberOfLines={1}>
            Mobile: {call}
            </Text>
            <Text style={styles.newsDescription}>Gender: {gender}</Text>
            <Text style={styles.newsCateLabel} numberOfLines={3}>
              {'Category:  ' + category}
            </Text>
            <Text style={styles.newsDescription} numberOfLines={3}>
              {'Sub Category:  ' + subCategory}
            </Text>
            <Text style={styles.newsDescription} numberOfLines={3}>
              {'Designation:  ' + designation}
            </Text>

            {/* <HTML
              source={{html: description}}
              contentWidth={width}
              tagsStyles={tagsStyles}
            /> */}
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      {/* <StatusBarPage /> */}
      <SafeAreaView style={styles.safeArea}>
        <HeaderCommon headername="My Contacts" />
        <View style={styles.newsBox}>
          {pending && !allContacts.length ? (
            <View style={styles.centeredContainer}>
              <ActivityIndicator
                size="large"
                color={"red"}
                animating={true}
                style={styles.activityIndicator}
              />
            </View>
          ) : allContacts.length ? (
            <FlatList
              data={allContacts}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={1}
              showsVerticalScrollIndicator={true}
              ListFooterComponent={renderLoader}
              onEndReached={loadmoreItems}
              onEndReachedThreshold={0}
              refreshControl={
                <RefreshControl refreshing={pending} onRefresh={onRefresh} />
              }
            />
          ) : (
            <View style={styles.centeredContainer}>
              <Text style={styles.noRecordText}>No Record Found</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  newsBox: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    paddingBottom: 10,
  },
  newsSection: {
    padding: 15,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: COLORS.red,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1.84,
    elevation: 1,
  },
  newsTopSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newsLeft: {
    width: '30%',
    alignItems: 'center',
  },
  newsImage: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  newsRight: {
    width: '66%',
    paddingLeft: 10,
  },
  newsCateLabel: {
    fontSize: 12,
    fontFamily: 'Baloo2-Bold',
    fontWeight:'bold'
  },
  newsDescription: {
    fontSize: 12,
    fontFamily: 'Baloo2-Bold',
    color: COLORS.dark,
    fontWeight:'bold'
  },
  newsBottomSection: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsBottomLeft: {},
  newsDateLabel: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Roboto-Bold',
    color: COLORS.pink,
  },
  newsBottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsReadMoreLabel: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Roboto-Bold',
    color: COLORS.primary,
  },
  newsBottomIcon: {
    fontSize: 20,
    color: COLORS.primary,
    paddingLeft: 5,
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