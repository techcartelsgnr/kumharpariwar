import React, { useEffect, useRef, useState } from 'react';
import {
  PermissionsAndroid,
  Linking,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { COLORS } from './src/theme/theme';
import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';
import { chkLogin } from './src/redux/slices/authSlice';
import { navigationRef } from './src/utils/NavigationUtil';
import { store } from './src/redux/store';

import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '@react-native-firebase/messaging';
import { fetchFCMToken } from './src/utils/fservices';

const Stack = createNativeStackNavigator();
const NAVIGATION_IDS = ['Notifications'];

function buildDeepLinkFromNotificationData(data) {
  const navigationId = data?.navigationId;
  if (!NAVIGATION_IDS.includes(navigationId)) return null;

  if (navigationId === 'Notifications') return 'kumharpariwar://Notifications';
  return null;
}

const AppContent = () => {
  const dispatch = useDispatch();
  const { token, isInitial } = useSelector(state => state.auth);
  const initialNotificationUrl = useRef(null);

  // 🔐 Request notification permission + FCM token
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
      }

      const messaging = getMessaging(getApp());
      const authStatus = await requestPermission(messaging);
      const enabled = authStatus === 1 || authStatus === 2;
      if (enabled) {
        await fetchFCMToken();
      }
    })();
  }, []);

  // 🔐 Check if logged in
  useEffect(() => {
    dispatch(chkLogin());
  }, []);

  // 📬 Foreground handler
  useEffect(() => {
    const unsubscribe = onMessage(getMessaging(getApp()), async remoteMessage => {
      console.log('📬 Foreground message:', remoteMessage);
      const { title, body } = remoteMessage.notification || {};
      const url = buildDeepLinkFromNotificationData(remoteMessage.data);

      if (title && body) {
        Alert.alert(title, body, [
          {
            text: 'Open',
            onPress: () => {
              if (url) {
                const screen = url.replace('kumharpariwar://', '');
                navigationRef.current?.navigate(screen);
              }
            },
          },
          { text: 'Ignore', style: 'cancel' },
        ]);
      }
    });

    return unsubscribe;
  }, []);

  // 🔗 Deep linking config
  const linking = {
    prefixes: ['kumharpariwar://'],
    config: {
      screens: {
        Notifications: 'Notifications',
      },
    },
    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (url) {
        initialNotificationUrl.current = url;
        return url;
      }

      const msg = await getInitialNotification(getMessaging(getApp()));
      if (msg?.data) {
        const deepLink = buildDeepLinkFromNotificationData(msg.data);
        if (deepLink) {
          initialNotificationUrl.current = deepLink;
          return deepLink;
        }
      }

      return null;
    },
    subscribe(listener) {
      const linkSub = Linking.addEventListener('url', ({ url }) => {
        listener(url);
      });

      const msgSub = onNotificationOpenedApp(getMessaging(getApp()), remoteMsg => {
        const url = buildDeepLinkFromNotificationData(remoteMsg.data);
        if (url) {
          listener(url);
        }
      });

      return () => {
        linkSub.remove();
        msgSub();
      };
    },
  };

  // 🎯 Navigate on app start with saved deep link
  useEffect(() => {
    if (!isInitial && token && initialNotificationUrl.current) {
      const url = initialNotificationUrl.current;
      const path = url.replace('kumharpariwar://', '');
      navigationRef.current?.navigate(path);
      initialNotificationUrl.current = null;
    }
  }, [isInitial, token]);

  if (isInitial) {
    return <ActivityIndicator size="large" color={COLORS.blue} />;
  }

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token != null ? MainStack() : AuthStack()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
