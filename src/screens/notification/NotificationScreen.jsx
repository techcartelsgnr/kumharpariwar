import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
} from 'react-native';


// api
import {useDispatch, useSelector} from 'react-redux';

import StatusBarPage from '../../components/StatusBarPage';
import HeaderCommon from '../../components/HeaderCommon';
import { fetchNotifications } from '../../redux/slices/MoreRepoSlice';
import { COLORS } from '../../theme/theme';

const NotifcationScreen = () => {
  const {token} = useSelector(state => state.auth);
  const {pending, notifications} = useSelector(state => state.reports);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNotifications({token}));
  }, [dispatch, token]);

  const onRefresh = () => {
    dispatch(fetchNotifications({token}));
  };

  const notificationsList = notifications.map((item, index) => {
    return (
      <View key={index} style={styles.notificationBox}>
        <Text style={styles.notiBoxNameText}>{item.title}</Text>
        <Text style={styles.notiBoxTimeText}>{item.description}</Text>
      </View>
    );
  });
  return (
    <>
      <StatusBarPage />
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.blue}}>
        <HeaderCommon headername="Notifications" />
        <ScrollView
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={pending} 
            />
          }
          contentContainerStyle={{paddingBottom: 20, flexGrow: 1, backgroundColor: COLORS.white,}}>
          {pending ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          ) : (
            notificationsList
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default NotifcationScreen;

const styles = StyleSheet.create({
  // Notification
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
});
