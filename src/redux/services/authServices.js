import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
// import PushNotification, {Importance} from 'react-native-push-notification';

const authAxios = axios.create({
  baseURL: 'https://kumharpariwar.synergixtechnologies.com/api/',
  headers: {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*',
    Accept: 'application/json',
  },
});

const login = async ({mobile, password}) => {
  const response = await authAxios.post(`/login`, {
    mobile: mobile,
    pin: password,
  });
  if (response.data.errors === undefined) {
    AsyncStorage.setItem('user_info', JSON.stringify(response.data)).then(
      () => {
        subScribeTounpaid();
        console.log('Data Saved');
      },
    );
    AsyncStorage.setItem('firstTime', JSON.stringify(false)).then(() => {
      console.log('First Time Saved');
    });

    console.log('i m in Response', JSON.stringify(response.data));
    await AsyncStorage.setItem('userInfo', JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

const register = async ({name, email, mobile, password, refCode, otp}) => {
  const response = await authAxios.post(`/register`, {
    name: name,
    email: email,
    mobile: mobile,
    pin: password,
    referred_by: refCode,
    otp: otp,
  });
  if (response.data.errors === undefined) {
    console.log('i m in register');
    subScribeTounpaid();
    await AsyncStorage.setItem('user_info', JSON.stringify(response.data));
    await AsyncStorage.setItem('firstTime', JSON.stringify(false));
  }
  return response.data;
};

//GET OTP
const getotp = async ({email, mobile, password}) => {
  const response = await authAxios.post(`/getotp`, {
    email: email,
    mobile: mobile,
    pin: password,
  });
  return response.data;
};
//GET OTP
const ResendOtp = async ({mobile}) => {
  const response = await authAxios.post(`/resendotp`, {
    mobile: mobile,
  });
  return response.data;
};

// Logout
const logout = async ({token}) => {
  const response = await authAxios.post(
    `/logout`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  AsyncStorage.removeItem('user_info').then(() => {
    console.log('Logut Successfully');
  });

  return response.data;
};
// changePassword
const changePassword = async ({token, new_pin, old_pin}) => {
  console.log(new_pin);
  const response = await authAxios.post(
    `/change_password`,
    {old_pin: old_pin, new_pin: new_pin},
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );

  return response.data;
};
const resetPassword = async ({ mobile, otp, password }) => {
  const response = await authAxios.post(`/userresetpassword`, {
    mobile,
    password,
    otp,
  });

  // ✅ Check for backend error manually
  if (response.data.errors) {
    throw new Error(response.data.errors); // forces catch in thunk
  }

  return response.data;
};
const updateProfilePic = async ({token, formData}) => {
  const response = await axios({
    method: 'post',
    url: 'https://kumharpariwar.com/api/user_image',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token,
    },
  });

  console.log('response in auth slice========>', response.data.user);

  const strUserInfo =  await AsyncStorage.getItem("userInfo");
  const parsUserInfo =  JSON.parse(strUserInfo)

  parsUserInfo.user = response.data.user;
  // // parsUserInfo.user.image = response.data.profile

  await AsyncStorage.setItem('userInfo', JSON.stringify(parsUserInfo));

  console.log('user info in update profile===>', response.data);
  return response.data;
};

// suggestions
const suggestions = async ({token, service_type, suggestion}) => {
  const response = await authAxios.post(
    `/suggestions`,
    {service_type: service_type, suggestion: suggestion},
    {
      headers: {
        'Content-Type': 'application/json',
        'Acess-Control-Allow-Origin': '*',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    },
  );
  console.log(response.data);
  return response.data;
};
// Notifications settings

const subScribeTounpaid = () => {
  messaging()
    .subscribeToTopic('unpaid')
    .then(() => {
      console.log('subscribed unpaid!!');
    });
};
const subScribeToPaid = () => {
  messaging()
    .subscribeToTopic('paid')
    .then(() => {
      console.log('subscribed Paid!!');
    });
};
const unsubScribeTounpaid = () => {
  messaging()
    .unsubscribeFromTopic('unpaid')
    .then(() => {
      console.log('subscribed!!');
    });
};
const unsubScribeTopaid = () => {
  messaging()
    .unsubscribeFromTopic('paid')
    .then(() => {
      console.log('subscribed!!');
    });
};
const createChannel = () => {
  // PushNotification.createChannel(
  //   {
  //     channelId: 'channel-1', // (required)
  //     channelName: 'My_New_channel', // (required)
  //     channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
  //     playSound: true, // (optional) default: true
  //     soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  //     importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  //     vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  //   },
  //   created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  // );
};

// const deleteChannel = () => {
//   PushNotification.deleteChannel('channel-1');
// };

const commanTask = (state, action) => {
  if (action.payload.user) {
    state.token = action.payload.token;
    state.image = action.payload.user.image;
    state.email = action.payload.user.email;
    state.name = action.payload.user.name;
    state.mobile = action.payload.user.mobile;
    state.user_id = action.payload.user.user_id;
    state.refCode = action.payload.user.my_referral_code;
    state.pending = false;
    state.error = false;
  }
};

const authService = {
  commanTask,
  register,
  getotp,
  login,
  logout,
  createChannel,
  // deleteChannel,
  unsubScribeTounpaid,
  unsubScribeTopaid,
  subScribeToPaid,
  changePassword,
  updateProfilePic,
  ResendOtp,
  resetPassword,
  suggestions,
};

export default authService;
