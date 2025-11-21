// fservice.js
import { Alert } from 'react-native';
import {
  getInitialNotification,
  getMessaging,
  getToken as getMessagingToken,
  onMessage,
  onNotificationOpenedApp,
} from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';
import { navigate } from './NavigationUtil';

const messaging = getMessaging(getApp());

// ✅ Fetch FCM Token
export const fetchFCMToken = async () => {
  try {
    const token = await getMessagingToken(messaging);
    if (token) {
      console.log('✅ FCM Token:', token);
      return token
      // Send token to your server
    } else {
      console.log('⚠️ FCM Token is null');
    }
  } catch (error) {
    console.log('❌ Error fetching FCM token:', error);
  }
};

// ✅ Setup Notification Listeners
export const notificationListener = () => {
  // 1️⃣ Foreground notification
  onMessage(messaging, async remoteMessage => {
    console.log('📲 Foreground Notification:', remoteMessage);
    const { title, body } = remoteMessage.notification || {};
    if (title && body) {
      Alert.alert(title, body);
    }
  });

  // 2️⃣ App opened from background by tapping notification
  onNotificationOpenedApp(messaging, remoteMessage => {
    console.log('🔁 App opened from background by notification');
    handleDeepLink(remoteMessage);
  });

  // 3️⃣ App opened from killed state by notification tap
  getInitialNotification(messaging).then(remoteMessage => {
    if (remoteMessage) {
      console.log('🛑 App opened from killed state by notification:', remoteMessage);
      handleDeepLink(remoteMessage);
    }
  });
};

// ✅ Deep link based on notification data
const handleDeepLink = remoteMessage => {
  const navigationId = remoteMessage?.data?.navigationId;
  const news_id = remoteMessage?.data?.news_id;

  console.log('navigationId:', navigationId);
  console.log('news_id:', news_id);

  if (navigationId === 'Notifications') {
    navigate('Notifications');
  } else if (navigationId === 'NewsDetails' && news_id) {
    navigate('NewsDetails', { news_id });
  } else {
    console.log('⚠️ No valid deep link found');
  }
};














// import { Alert, Linking, PermissionsAndroid, Platform } from 'react-native';
// import {
//   getMessaging,
//   requestPermission,
//   getToken as getMessagingToken,
//   onMessage,
//   onNotificationOpenedApp,
//   getInitialNotification,
// } from '@react-native-firebase/messaging';

// import { getApp } from '@react-native-firebase/app';
// import { navigate } from './NavigationUtil';

// // ✅ Get correct messaging instance
// const messaging = getMessaging(getApp());

// // Request notification permission (Android & iOS)
// // export async function requestUserPermission() {
// //   try {
// //     const androidGranted = await requestAndroidNotificationPermission();
// //     if (!androidGranted) {
// //       console.log('❌ Android Notification permission denied');
// //       return;
// //     }

// //     const authStatus = await requestPermission(messaging); // ✅ pass messaging
// //     const enabled = authStatus === 1 || authStatus === 2;

// //     if (enabled) {
// //       console.log('✅ Notification permission granted');
// //       // await fetchFCMToken(); // ✅ call properly fixed function
// //     } else {
// //       console.log('⚠️ Notification permission not granted');
// //     }
// //   } catch (error) {
// //     console.log('❌ requestUserPermission error:', error);
// //   }
// // }

// // // Runtime permission for Android 13+
// // const requestAndroidNotificationPermission = async () => {
// //   if (Platform.OS === 'android' && Platform.Version >= 33) {
// //     const result = await PermissionsAndroid.request(
// //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
// //     );
// //     return result === PermissionsAndroid.RESULTS.GRANTED;
// //   }
// //   return true;
// // };

// // ✅ Correctly get FCM token using messaging instance
// export const fetchFCMToken = async () => {
//   try {
//     const token = await getMessagingToken(messaging); // ✅ pass messaging
//     if (token) {
//       console.log('✅ FCM Token:=========>', token);
//       // Send token to server here if required
//     } else {
//       console.log('⚠️ FCM Token is null');
//     }
//   } catch (error) {
//     console.log('❌ Error fetching FCM token:', error);
//   }
// };

// // Notification listeners
// export const notificationListener = () => {
//   // App opened from background
//   onNotificationOpenedApp(messaging, remoteMessage => {
//     console.log('🔁 App opened from background by notification');
//     handleDeepLink(remoteMessage);
//   });

//   // App opened from quit state
//   // getInitialNotification(messaging).then(remoteMessage => {
//   //   if (remoteMessage) {
//   //     console.log('🛑 App opened from quit state by notification:', remoteMessage);
//   //     handleDeepLink(remoteMessage);
//   //   }
//   // });

//   // Foreground notification
//   onMessage(messaging, async remoteMessage => {
//     console.log('📲 Foreground Notification:', remoteMessage);
//     const { title, body } = remoteMessage.notification || {};
//     if (title && body) {
//       Alert.alert(title, body);
//     }
//   });
// };

// // Deep link handler
// const handleDeepLink = remoteMessage => {
//   const navigationId = remoteMessage?.data?.navigationId;
//   const news_id = remoteMessage?.data?.news_id;

//   console.log('navigationId:', navigationId);
//   console.log('news_id:', news_id);

//   if (navigationId === 'Notifications') {
//     Linking.openURL('kumharpariwar://Notifications');
//   } else if (navigationId === 'NewsDetails' && news_id) {
//     Linking.openURL(`kumharpariwar://NewsDetails?news_id=${news_id}`);
//   } else {
//     console.log('⚠️ No valid deep link found');
//   }
// };
