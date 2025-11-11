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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
import karykarni from '../screens/karaykarni/karykarni'
import AllKaraykarni from '../screens/karaykarni/AllKaraykarni'
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
          // paddingTop: 8,
          paddingBottom: 8 + insets.bottom,
          height: 55 + insets.bottom,
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Hind-SemiBold',
          fontSize: 10,
          letterSpacing: 0.2,
          marginTop: 2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerActive]}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="OurProud"
        component={OurProud}
        options={{
          tabBarLabel: 'Our Proud',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerActive]}>
              <FontAwesome5 
                name="award" 
                size={20} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerActive]}>
              <Ionicons 
                name={focused ? "search" : "search-outline"} 
                size={24} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: 'Posts',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerActive]}>
              <Ionicons 
                name={focused ? "newspaper" : "newspaper-outline"} 
                size={22} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.tabIconContainer, focused && styles.tabIconContainerActive]}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={24} 
                color={color} 
              />
            </View>
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
  const insets = useSafeAreaInsets();

  const handleLogout = () => setModalVisible(true);
  const handleConfirmLogout = () => {
    dispatch(logout({ token }));
    setModalVisible(false);
  };
  const handleCancelLogout = () => setModalVisible(false);

  const menuItems = [
    {
      name: 'Home Page',
      icon: 'home',
      color: '#5d3bf1',
      onPress: () => props.navigation.navigate('MainTabs'),
      iconType: 'ionicons'
    },
    {
      name: 'My Contacts',
      icon: 'contacts',
      color: '#30d14e',
      onPress: () => props.navigation.navigate('MyContactScreen'),
      iconType: 'material'
    },
    {
      name: 'Gallery',
      icon: 'image',
      color: '#ff6b6b',
      onPress: () => props.navigation.navigate('GalleryScreen'),
      iconType: 'material'
    },
    {
      name: 'KaryKarni',
      icon: 'people',
      color: '#4ecdc4',
      onPress: () => props.navigation.navigate('karykarniScreen'),
      iconType: 'material'
    },
    {
      name: 'Terms & Conditions',
      icon: 'document-text',
      color: '#0084a8',
      onPress: () => props.navigation.navigate('TermsConditionScreen'),
      iconType: 'ionicons'
    },
  ];

  const renderIcon = (iconType, iconName, color, size = 20) => {
    switch (iconType) {
      case 'material':
        return <MaterialIcons name={iconName} size={size} color={color} />;
      case 'fontawesome':
        return <FontAwesome5 name={iconName} size={size} color={color} />;
      default:
        return <Ionicons name={iconName} size={size} color={color} />;
    }
  };

  return (
    <>
      {/* Animated Gradient Background */}
      <AnimatedGradient
        colors={['#2E3192', '#5d3bf1', '#1a183f']}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Drawer Content Overlay */}
      <View style={{ flex: 1, paddingBottom: insets.bottom }}>
        <DrawerContentScrollView 
          {...props} 
          contentContainerStyle={{ 
            backgroundColor: 'transparent',
            paddingTop: insets.top + 20 
          }}
        >
          {/* Header Section */}
          <View style={styles.drawerHeader}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/jpks_logo.png')}
                style={styles.logoImage}
              />
              <View style={styles.logoBadge}>
                <Text style={styles.logoBadgeText}>JPKS</Text>
              </View>
            </View>
            <Text style={styles.usernameText}>कुम्हार परिवार</Text>
            <Text style={styles.welcomeText}>Welcome to Community</Text>
          </View>

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={item.onPress}>
                <View style={styles.drawerRow}>
                  <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}>
                    {renderIcon(item.iconType, item.icon, 'white', 18)}
                  </View>
                  <Text style={styles.drawerText}>{item.name}</Text>
                  <View style={styles.chevronContainer}>
                    <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.7)" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </DrawerContentScrollView>

        {/* Footer - Logout */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <View style={styles.logoutIconContainer}>
              <Ionicons name="log-out-outline" size={20} color={COLORS.redcolor} />
            </View>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Modal */}
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalIconContainer}>
                <Ionicons name="log-out-outline" size={48} color={COLORS.redcolor} />
              </View>
              <Text style={styles.modalTitle}>Logout</Text>
              <Text style={styles.modalText}>Are you sure you want to logout?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={handleCancelLogout}>
                  <Text style={styles.modalButtonCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonConfirm]}
                  onPress={handleConfirmLogout}>
                  <Text style={styles.modalButtonConfirmText}>Logout</Text>
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
        drawerStyle: { 
          backgroundColor: 'transparent', 
          width: 300 
        },
        sceneContainerStyle: { backgroundColor: 'transparent' },
        drawerType: 'front',
      }}>
      <Drawer.Screen name="MainTabs" component={MainTabs} />
      <Drawer.Screen name="MyContactScreen" component={MyContactScreen} />
      <Drawer.Screen name="GalleryScreen" component={GallaryScreen} />
      <Drawer.Screen name="TermsConditionScreen" component={TermsConditionScreen} />
      <Drawer.Screen name="karykarniScreen" component={karykarni} />
      <Drawer.Screen name="AllKaraykarniScreen" component={AllKaraykarni} />
    </Drawer.Navigator>
  );
}

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  // Bottom Tab Styles
  tabIconContainer: {
    // padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainerActive: {
    // backgroundColor: 'rgba(255,255,255,0.2)',
    transform: [{ scale: 1.1 }],
  },

  // Drawer Header Styles
  drawerHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
    marginBottom: 10,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  logoImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  logoBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  logoBadgeText: {
    color: COLORS.dark,
    fontSize: 10,
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 22,
    fontFamily: 'Baloo2-Bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: 'Hind-Medium',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },

  // Menu Styles
  menuContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  drawerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  drawerText: {
    fontSize: 16,
    fontFamily: 'Hind-SemiBold',
    color: 'white',
    flex: 1,
  },
  chevronContainer: {
    opacity: 0.7,
  },

  // Footer Styles
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.redcolor,
  },
  logoutIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(238,29,35,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Hind-SemiBold',
    color: COLORS.redcolor,
    flex: 1,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 320,
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(238,29,35,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Baloo2-Bold',
    color: COLORS.dark,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'Hind-Medium',
    color: COLORS.body,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  modalButtonConfirm: {
    backgroundColor: COLORS.redcolor,
  },
  modalButtonCancelText: {
    fontSize: 16,
    fontFamily: 'Hind-SemiBold',
    color: COLORS.dark,
  },
  modalButtonConfirmText: {
    fontSize: 16,
    fontFamily: 'Hind-SemiBold',
    color: 'white',
  },
});