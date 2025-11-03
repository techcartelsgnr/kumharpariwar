import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {

  OurProud,
  MyContacts,
  Terms,
  About,
  MyNews,
} from '../screens/index/index';
import {COLORS} from '../theme/theme';
import {logout} from '../redux/slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import TermsConditionScreen from '../screens/termCondition/TermsConditionScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function HomeStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: '#f3f3f3',
        tabBarStyle: {
          backgroundColor: COLORS.blue,
          paddingBottom: 5,
          borderTopColor: COLORS.blue,
          paddingTop: 6,
          height: 56,
          elevation: 0,
          shadowOpacity: 0.2,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        },
        tabBarLabelStyle: {
          fontFamily: 'Hind-SemiBold',
          fontSize: 9,
          letterSpacing: 0.2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={DrawerNavigator}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('../../assets/tab/hometab1.png')
                  : require('../../assets/tab/homewhite1.png')
              }
              style={[styles.hometabFirst, {tintColor: color}]}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Our Proud"
        component={OurProud}
        options={{
          tabBarLabel: 'Our Proud',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('../../assets/tab/ouproudfill.png')
                  : require('../../assets/tab/ouproudwhite.png')
              }
              style={[styles.hometabFirst, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('../../assets/tab/searchfill.png')
                  : require('../../assets/tab/searchwhite.png')
              }
              style={[styles.hometabFirst, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          tabBarLabel: 'Posts',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('../../assets/tab/newsfill.png')
                  : require('../../assets/tab/newswhite.png')
              }
              style={[styles.hometabFirst, {tintColor: color}]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({focused, color}) => (
            <Image
              source={
                focused
                  ? require('../../assets/tab/profiletab.png')
                  : require('../../assets/tab/profilewhite.png')
              }
              style={[styles.hometabFirst, {tintColor: color}]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.auth);
  const [isModalVisible, setModalVisible] = useState(false);
  const handleLogout = () => {
    setModalVisible(true);
  };
  const handleConfirmLogout = () => {
    dispatch(logout({token}));
    setModalVisible(false);
  };

  const handleCancelLogout = () => {
    setModalVisible(false);
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.customDrawerItem}>
          {/* Home Page */}
          <View
            style={{
              backgroundColor: COLORS.bg,
              marginTop: -5,
              paddingVertical: 15,
            }}>
            <Image
              source={require('../../assets/jpks_logo.png')}
              style={{
                height: 80,
                width: 80,
                alignSelf: 'center',

                backgroundColor: COLORS.bg,
              }}
            />
            <Text style={styles.usernameText}>Home Page</Text>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('Home Page')}>
            <View style={styles.drawerRow}>
              <View
                style={[styles.myProfileIcon, {backgroundColor: '#5d3bf1'}]}>
                <Ionicons
                  name="home-outline"
                  style={styles.myProfileMainIcon}
                />
              </View>
              <Text style={styles.drawerText}>Home Page</Text>
              <View style={{flex: 1}} />
              <Ionicons name="chevron-forward-outline" size={20} />
            </View>
          </TouchableOpacity>

          {/* My News */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('My News')}>
            <View style={styles.drawerRow}>
              <View
                style={[styles.myProfileIcon, {backgroundColor: '#54bfe9'}]}>
                <Ionicons
                  name="newspaper-outline"
                  style={styles.myProfileMainIcon}
                />
              </View>
              <Text style={styles.drawerText}>My Posts</Text>
              <View style={{flex: 1}} />
              <Ionicons name="chevron-forward-outline" size={20} />
            </View>
          </TouchableOpacity>

          {/* My Contacts */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('My Contacts')}>
            <View style={styles.drawerRow}>
              <View
                style={[styles.myProfileIcon, {backgroundColor: '#30d14e'}]}>
                <Ionicons
                  name="logo-whatsapp"
                  style={styles.myProfileMainIcon}
                />
              </View>
              <Text style={styles.drawerText}>My Contacts</Text>
              <View style={{flex: 1}} />
              <Ionicons name="chevron-forward-outline" size={20} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(navigationStrings.ABOUT)}>
            <View style={styles.drawerRow}>
              <View
                style={[styles.myProfileIcon, {backgroundColor: '#ffaa00'}]}>
                <Ionicons
                  name="information-circle-outline"
                  style={styles.myProfileMainIcon}
                />
              </View>
              <Text style={styles.drawerText}>About Us</Text>
              <View style={{flex: 1}} />
              <Ionicons name="chevron-forward-outline" size={20} />
            </View>
          </TouchableOpacity>

          {/* Terms & Conditions */}
          <TouchableOpacity
            onPress={() => props.navigation.navigate('TermsConditionScreen')}>
            <View style={styles.drawerRow}>
              <View
                style={[styles.myProfileIcon, {backgroundColor: '#0084a8'}]}>
                <Ionicons
                  name="document-text"
                  style={styles.myProfileMainIcon}
                />
              </View>
              <Text style={styles.drawerText}>Terms & Conditions</Text>
              <View style={{flex: 1}} />
              <Ionicons name="chevron-forward-outline" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      {/* Logout */}

      {/* Logout */}
      <TouchableOpacity onPress={() => handleLogout()}>
        <View
          style={[
            styles.drawerRow,
            {borderTopColor: '#e0e3f7', borderTopWidth: 1},
          ]}>
          <View
            style={[styles.myProfileIcon, {backgroundColor: COLORS.redcolor}]}>
            <Ionicons name="exit" style={styles.myProfileMainIcon} />
          </View>
          <Text style={styles.drawerText}>Logout</Text>
          <View style={{flex: 1}} />
          <Ionicons name="chevron-forward-outline" size={20} />
        </View>
      </TouchableOpacity>
      {/* Modal for logout confirmation */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../../assets/logout.png')} // Replace with your image path
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Naah, Just Kidding</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonConfirm]}
                onPress={handleConfirmLogout}>
                <Text style={[styles.modalButtonText, {color: '#fefefe'}]}>
                  Yes, Log Me Out
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fefefe',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home Page"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="My News"
        component={MyNews}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="My Contacts"
        component={MyContacts}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="About"
        component={About}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Terms"
        component={Terms}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  hometabFirst: {
    height: 22,
    width: 22,
  },
  customDrawerItem: {
    marginTop: 0,
  },
  drawerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBlockColor: '#e0e3f7',
  },
  drawerText: {
    fontSize: 14,
    fontFamily: 'Baloo2-Bold',
    color: '#0c0c0c',
  },
  usernameText: {
    fontSize: 14,
    fontFamily: 'Baloo2-Medium',
    color: COLORS.white,
    textAlign: 'center',
  },
  myProfileMainIcon: {
    color: COLORS.white,
    fontSize: 16,
  },
  myProfileIcon: {
    width: 32,
    height: 32,
    borderRadius: 50,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 50,
    height: 50,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Baloo2-Medium',
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    color: COLORS.bg,
    fontFamily: 'Baloo2-Medium',
  },
  modalButtonCancel: {
    borderWidth: 1,
    borderColor: COLORS.bg,
    marginBottom: 10,
  },
  modalButtonConfirm: {
    backgroundColor: COLORS.bg,
    color: '#fefefe',
  },
  LDlogoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 5,
    paddingHorizontal: 15,
    textAlign: 'center',
    maxWidth: '100%',
    backgroundColor: COLORS.blue,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.darkgreen,
    borderRadius: 4,
  },
  LDlogoutBtnText: {
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Baloo2-Bold',
    fontSize: 15,

    //textTransform: 'uppercase'
  },
  modalBoxborder: {
    width: 10,
  },
});
