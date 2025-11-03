import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabRoutes from './TabRoutes';
import RegistrationForm from '../screens/registerform/RegistrationForm';
import SearchScreen from '../screens/search/SearchScreen';
import NewsScreen from '../screens/news/NewsScreen';
import OurProud from '../screens/ourProud/OurProudScreen';
import DirectoryListsScreen from '../screens/directoryLists/DirectoryListsScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import ReferralScreen from '../screens/referral/ReferralScreen';
import GallaryScreen from '../screens/gallery/GallaryScreen';
import AllBusinessScreen from '../screens/allbusinesslist/AllBusinessScreen';
import MyContactScreen from '../screens/mycontact/MyContactScreen';
import EditNewsScreen from '../screens/editnews/EditNewsScreen';
import AddContactToDeirhScree from '../screens/addcontactTodirectory/AddContactToDeirhScree';
import FaqScreen from '../screens/faq/FaqScreen';
import TermsConditionScreen from '../screens/termCondition/TermsConditionScreen';
import NewsDetailsScreen from '../screens/newsdetails/NewsDetailsScreen';
import EditProfileScreen from '../screens/editProfile/EditProfileScreen';
import BusinessData from '../components/BusinessData';
import Search from '../screens/search/Search';
import SuggestionScreen from '../screens/suggetion/SuggestionScreen';
import Terms from '../screens/about/AboutScreen';
import AddNewsScreen from '../screens/addnews/AddNewsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChangePasswordScreen from '../screens/chnagepassword/ChangePasswordScreen';
import DirectoryContact from '../screens/directorycontact/DirectoryContact';
import GusetHouseDetailsScreen from '../screens/guestHouse/GusetHouseDetailsScreen';
import HostelsDetailsScreen from '../screens/hostal/HostelsDetailsScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <>
      <Stack.Screen name="TabRoutes" component={TabRoutes} />
      <Stack.Screen name="RegistrationForm" component={RegistrationForm} />
      <Stack.Screen
        name="GusetHouseDetailsScreen"
        component={GusetHouseDetailsScreen}
      />
      <Stack.Screen
        name="HostelsDetailsScreen"
        component={HostelsDetailsScreen}
      />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="OurProud" component={OurProud} />
      <Stack.Screen name="DirectoryLists" component={DirectoryListsScreen} />
      <Stack.Screen name="DirectoryContacts" component={DirectoryContact} />
      <Stack.Screen name="Notifications" component={NotificationScreen} />
      <Stack.Screen name="Referral" component={ReferralScreen} />
      <Stack.Screen name="Gallery" component={GallaryScreen} />
      <Stack.Screen name="MyContacts" component={MyContactScreen} />
      <Stack.Screen name="AddNews" component={AddNewsScreen} />
      <Stack.Screen name="EditNews" component={EditNewsScreen} />
      <Stack.Screen
        name="AddContactToDirectory"
        component={AddContactToDeirhScree}
      />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="Faq" component={FaqScreen} />
      <Stack.Screen name="Terms" component={TermsConditionScreen} />
      <Stack.Screen name="NewsDetails" component={NewsDetailsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="BusinessData" component={BusinessData} />
      <Stack.Screen name="AllBusinessList" component={AllBusinessScreen} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen name="Suggestion" component={SuggestionScreen} />
      <Stack.Screen name="About" component={Terms} />
      <Stack.Screen name="MyProfile" component={ProfileScreen} />
    </>
  );
};

export default MainStack;
