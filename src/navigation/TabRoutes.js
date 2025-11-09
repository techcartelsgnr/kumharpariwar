import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { logout } from '../redux/slices/authSlice';
import { COLORS } from '../theme/theme';

// Screens
import {
  Home,
  OurProud,
  SearchScreen,
  NewsScreen,
  ProfileScreen,
  TermsConditionScreen,
  MyContactScreen,
} from '../screens/index/index';
import GallaryScreen from '../screens/gallery/GallaryScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// -------------------- Animated Gradient Component --------------------
function AnimatedGradient({ colors, style }) {
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 4000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  // For simplicity, static gradient here. For dynamic interpolation you could extend this.
  return (
    <LinearGradient
      colors={colors}
      style={[style, { flex: 1 }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  );
}

// -------------------- Bottom Tabs --------------------
function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: '#f3f3f3',
        tabBarStyle: {
          backgroundColor: COLORS.blue,
          borderTopColor: COLORS.blue,
          paddingTop: 3,
          paddingBottom: 5 + insets.bottom,
          height: 56 + insets.bottom,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontFamily: 'Hind-SemiBold',
          fontSize: 9,
          letterSpacing: 0.2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/hometab1.png')}
              style={[styles.hometabFirst, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OurProud"
        component={OurProud}
        options={{
          tabBarLabel: 'Our Proud',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/ouproudfill.png')}
              style={[styles.hometabFirst, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/searchfill.png')}
              style={[styles.hometabFirst, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: 'Posts',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/newsfill.png')}
              style={[styles.hometabFirst, { tintColor: color }]}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/tab/profiletab.png')}
              style={[styles.hometabFirst, { tintColor: color }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// -------------------- Custom Drawer --------------------
function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogout = () => setModalVisible(true);
  const handleConfirmLogout = () => {
    dispatch(logout({ token }));
    setModalVisible(false);
  };
  const handleCancelLogout = () => setModalVisible(false);
 const insets = useSafeAreaInsets();
  return (
    
    <>
      {/* Animated Gradient Background */}
      <AnimatedGradient
        colors={['#3366c6', '#6a60da', '#46f0f7']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 ,  }}
      />

      {/* Drawer Content Overlay */}
      <View style={{ flex: 1 ,paddingBottom: 5 + insets.bottom,}}>
        <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: 'transparent' }}>
          <View style={{ backgroundColor: 'transparent', paddingVertical: 20 }}>
            <Image
              source={require('../../assets/jpks_logo.png')}
              style={{ height: 80, width: 80, alignSelf: 'center' }}
            />
            <Text style={styles.usernameText}>कुम्हार परिवार</Text>
          </View>

          {/* Home Page */}
          <TouchableOpacity onPress={() => props.navigation.navigate('MainTabs')}>
            <View style={styles.drawerRow}>
              <View style={[styles.myProfileIcon, { backgroundColor: '#5d3bf1' }]}>
                <Ionicons name="home-outline" style={styles.myProfileMainIcon} />
              </View>
              <Text style={styles.drawerText}>Home Page</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="white" />
            </View>
          </TouchableOpacity>

          {/* My Contacts */}
          <TouchableOpacity onPress={() => props.navigation.navigate('MyContactScreen')}>
            <View style={styles.drawerRow}>
              <View style={[styles.myProfileIcon, { backgroundColor: '#30d14e' }]}>
                <Ionicons name="logo-whatsapp" style={styles.myProfileMainIcon} />
              </View>
              <Text style={styles.drawerText}>My Contacts</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="white" />
            </View>
          </TouchableOpacity>

          {/* Terms & Conditions */}
          <TouchableOpacity onPress={() => props.navigation.navigate('TermsConditionScreen')}>
            <View style={styles.drawerRow}>
              <View style={[styles.myProfileIcon, { backgroundColor: '#0084a8' }]}>
                <Ionicons name="document-text" style={styles.myProfileMainIcon} />
              </View>
              <Text style={styles.drawerText}>Terms & Conditions</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('GalleryScreen')}>
            <View style={styles.drawerRow}>
              <View style={[styles.myProfileIcon, { backgroundColor: '#0084a8' }]}>
                <Ionicons name="document-text" style={styles.myProfileMainIcon} />
              </View>
              <Text style={styles.drawerText}>Gallary</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="white" />
            </View>
          </TouchableOpacity>
        </DrawerContentScrollView>

        {/* Logout */}
        <TouchableOpacity onPress={handleLogout}>
          <View
            style={[
              styles.drawerRow,
              { borderTopColor: 'rgba(255,255,255,0.2)', borderTopWidth: 1 },
            ]}>
            <View style={[styles.myProfileIcon, { backgroundColor: COLORS.redcolor }]}>
              <Ionicons name="exit" style={styles.myProfileMainIcon} />
            </View>
            <Text style={styles.drawerText}>Logout</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="white" />
          </View>
        </TouchableOpacity>

        {/* Logout Modal */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../../assets/logout.png')}
                style={styles.modalImage}
              />
              <Text style={styles.modalText}>Are you sure you want to logout?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={handleCancelLogout}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonConfirm]}
                  onPress={handleConfirmLogout}>
                  <Text style={[styles.modalButtonText, { color: '#fefefe' }]}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

// -------------------- Drawer Navigator --------------------
export default function AppDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: 'transparent', width: 280 },
        sceneContainerStyle: { backgroundColor: 'transparent' },
      }}>
      {/* Keep MainTabs as one drawer screen */}
      <Drawer.Screen name="MainTabs" component={MainTabs} />
      <Drawer.Screen name="MyContactScreen" component={MyContactScreen} />
      <Drawer.Screen name="GalleryScreen" component={GallaryScreen} />
      <Drawer.Screen
        name="TermsConditionScreen"
        component={TermsConditionScreen}
      />
    </Drawer.Navigator>
  );
}

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  hometabFirst: { height: 22, width: 22 },
  drawerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(220, 220, 245, 0.2)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    marginVertical: 2,
  },
  drawerText: {
    fontSize: 15,
    fontFamily: 'Baloo2-Bold',
    color: 'white',
    flex: 1,
  },
  usernameText: {
    fontSize: 18,
    fontFamily: 'Baloo2-SemiBold',
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 0.8,
  },
  myProfileMainIcon: { color: 'white', fontSize: 18 },
  myProfileIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 14,
    backgroundColor: 'rgba(0,0,0,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: { width: 50, height: 50, marginBottom: 15 },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'Baloo2-Medium',
    textAlign: 'center',
  },
  modalButtons: { flexDirection: 'column', width: '100%' },
  modalButton: {
    padding: 10,
    marginVertical: 5,
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
  },
  modalButtonConfirm: { backgroundColor: COLORS.bg },
});
