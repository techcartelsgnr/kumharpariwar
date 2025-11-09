import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderCommon from '../../components/HeaderCommon';
import { fetchNotifications } from '../../redux/slices/MoreRepoSlice';
import { COLORS } from '../../theme/theme';

const NotificationScreen = () => {
  const { token } = useSelector(state => state.auth);
  const { pending, notifications } = useSelector(state => state.reports);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchNotifications({ token }));
    }
  }, [dispatch, token]);

  const onRefresh = () => {
    if (token) {
      dispatch(fetchNotifications({ token }));
    }
  };

  // 🧠 Safely map only if notifications is an array
  const notificationsList =
    Array.isArray(notifications) && notifications.length > 0
      ? notifications.map((item, index) => (
          <View key={index} style={styles.notificationBox}>
            <Text style={styles.notiBoxNameText}>{item.title}</Text>
            <Text style={styles.notiBoxTimeText}>{item.description}</Text>
          </View>
        ))
      : null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
      <HeaderCommon headername="Notifications" />
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={pending} />
        }
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1,
          backgroundColor: COLORS.white,
        }}>
        {pending ? (
          <View style={styles.loaderBox}>
            <Text>Loading...</Text>
          </View>
        ) : Array.isArray(notifications) && notifications.length > 0 ? (
          notificationsList
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>No notifications found</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  notificationBox: {
    backgroundColor: '#eee',
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  notiBoxNameText: {
    color: COLORS.dark,
    fontFamily: 'Hind-Bold',
    fontSize: 14,
  },
  notiBoxTimeText: {
    color: COLORS.dark,
    fontFamily: 'Hind-Medium',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 5,
  },
  loaderBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: COLORS.dark,
    fontFamily: 'Hind-Medium',
  },
});
