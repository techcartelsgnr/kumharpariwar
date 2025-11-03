import React, { useCallback, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Modal,
    Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


// logout api here
import { useDispatch, useSelector } from 'react-redux';
import StatusBarPage from '../../components/StatusBarPage';
import HeaderCommon from '../../components/HeaderCommon';
import { COLORS } from '../../theme/theme';
import navigationStrings from '../../utils/navigationStrings';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { logout } from '../../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [userInfo, setUserInfo] = useState(null)
    const handleLogout = () => {
        setModalVisible(true);
    };

    const handleConfirmLogout = () => {
        dispatch(logout({ token }));
        setModalVisible(false);
    };

    const handleCancelLogout = () => {
        setModalVisible(false);
    };

    const dispatch = useDispatch();
    const { token, mobile, name, email, image, helpline_number } = useSelector(
        state => state.auth,
    );

    console.log("ProfileScreen image:", image);

    const website = 'https://techcartel.in';



    const getProfilePic = async () => {
        try {
            const userInfo = await AsyncStorage.getItem('userInfo')
            console.log("user info find", userInfo)
            const parUserInfo = JSON.parse(userInfo)
            console.log("parUserInfo", parUserInfo)
            setUserInfo(parUserInfo)
        } catch (error) {

        }
    }

    useFocusEffect(
        useCallback(() => {
            getProfilePic()
        }, [])
    )


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>

            <StatusBarPage />
            <HeaderCommon headername="My Profile" />
            <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.white }}>
                <View style={styles.profile}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("EditProfile")
                        }>
                        <View style={styles.profileAvatarWrapper}>
                            {
                                userInfo && (
                                    <Image
                                        source={{ uri: userInfo?.user?.image }}
                                        style={styles.profileAvatar}
                                    />
                                )
                            }
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("EditProfile")
                                }
                            >
                                <View style={styles.profileAction}>
                                    <Feather color="#fff" name="edit-3" size={15} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.profileName}>{name}</Text>
                        <Text style={styles.profileAddress}>{mobile}</Text>
                    </View>
                </View>
                <View style={styles.myProfileBox}>
                    <Text style={styles.myProfileTitle}>MORE OPTIONS</Text>
                    <TouchableOpacity
                        style={styles.myProfileMain}
                        onPress={() =>
                            navigation.navigate(navigationStrings.ADDCONTACTTOCIRECTORY)
                        }>
                        <View
                            style={[styles.myProfileIcon, { backgroundColor: '#986b46' }]}>
                            <Ionicons
                                name="document-text-outline"
                                style={styles.myProfileMainIcon}
                            />
                        </View>
                        <Text style={styles.myProfileLabel}>
                            Add Contact to Directory
                        </Text>
                        <View style={styles.myProfileSpacer} />
                        <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
              style={styles.myProfileMain}
              onPress={() => navigation.navigate(navigationStrings.MYCONTACTS)}>
              <View
                style={[styles.myProfileIcon, {backgroundColor: '#30d14e'}]}>
                <Ionicons
                  name="logo-whatsapp"
                  style={styles.myProfileMainIcon}
                />
              </View>
              <Text style={styles.myProfileLabel}>My Contacts</Text>
              <View style={styles.myProfileSpacer} />
              <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
            </TouchableOpacity> */}
                    <TouchableOpacity
                        style={styles.myProfileMain}
                        onPress={() => navigation.navigate(navigationStrings.ADDNEWS)}>
                        <View
                            style={[styles.myProfileIcon, { backgroundColor: '#f9b432' }]}>
                            <Ionicons name="add-outline" style={styles.myProfileMainIcon} />
                        </View>
                        <Text style={styles.myProfileLabel}>Add Post</Text>
                        <View style={styles.myProfileSpacer} />
                        <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
              style={styles.myProfileMain}
              onPress={() => navigation.navigate(navigationStrings.MYNEWS)}>
              <View
                style={[styles.myProfileIcon, {backgroundColor: '#0078d4'}]}>
                <Ionicons
                  name="newspaper-outline"
                  style={styles.myProfileMainIcon}
                />
              </View>
              <Text style={styles.myProfileLabel}>My News</Text>
              <View style={styles.myProfileSpacer} />
              <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
            </TouchableOpacity> */}
                    <TouchableOpacity
                        style={styles.myProfileMain}
                        onPress={() =>
                            navigation.navigate(navigationStrings.CHANGEPASSWORD)
                        }>
                        <View
                            style={[styles.myProfileIcon, { backgroundColor: '#344dde' }]}>
                            <Ionicons name="lock-open" style={styles.myProfileMainIcon} />
                        </View>
                        <Text style={styles.myProfileLabel}>Change Password</Text>
                        <View style={styles.myProfileSpacer} />
                        <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.myProfileMain}>
              <View
                style={[styles.myProfileIcon, {backgroundColor: '#32c759'}]}>
                <Ionicons name="call" style={styles.myProfileMainIcon} />
              </View>
              <Text style={styles.myProfileLabel}>Contact Us</Text>
              <View style={styles.myProfileSpacer} />
              <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
            </TouchableOpacity> */}
                    {/* <TouchableOpacity
              style={styles.myProfileMain}
              onPress={() => navigation.navigate(navigationStrings.REFERRAL)}>
              <View
                style={[styles.myProfileIcon, {backgroundColor: '#54bfe9'}]}>
                <Ionicons name="share" style={styles.myProfileMainIcon} />
              </View>
              <Text style={styles.myProfileLabel}>Share With Friends</Text>
              <View style={styles.myProfileSpacer} />
              <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
            </TouchableOpacity> */}
                    <TouchableOpacity
                        style={styles.myProfileMain}
                        onPress={() => navigation.navigate(navigationStrings.SUGGESTION)}>
                        <View
                            style={[styles.myProfileIcon, { backgroundColor: '#8100b9' }]}>
                            <Ionicons
                                name="archive-outline"
                                style={styles.myProfileMainIcon}
                            />
                        </View>
                        <Text style={styles.myProfileLabel}>Suggestion Box</Text>
                        <View style={styles.myProfileSpacer} />
                        <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity
              style={styles.myProfileMain}
              onPress={() => navigation.navigate(navigationStrings.ABOUT)}>
              <View
                style={[
                  styles.myProfileIcon,
                  {backgroundColor: COLORS.youtubeclr},
                ]}>
                <Ionicons
                  name="information-circle-outline"
                  style={styles.myProfileMainIcon}
                />
              </View>
              <Text style={styles.myProfileLabel}>About Us</Text>
              <View style={styles.myProfileSpacer} />
              <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.myProfileMain}
              onPress={() => navigation.navigate(navigationStrings.TERMS)}>
              <View
                style={[styles.myProfileIcon, {backgroundColor: '#0084a8'}]}>
                <Ionicons
                  name="document-text"
                  style={styles.myProfileMainIcon}
                />
              </View>
              <Text style={styles.myProfileLabel}>Terms & Conditions</Text>
              <View style={styles.myProfileSpacer} />
              <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
            </TouchableOpacity> */}
                    {/* <TouchableOpacity
              style={styles.myProfileMain}
              onPress={handleLogout}>
              <View
                style={[
                  styles.myProfileIcon,
                  {backgroundColor: COLORS.redcolor},
                ]}>
                <Ionicons name="exit" style={styles.myProfileMainIcon} />
              </View>
              <Text style={styles.myProfileLabel}>Logout</Text>
              <View style={styles.myProfileSpacer} />
              <Feather name="chevron-right" style={styles.myProfileArrowIcon} />
            </TouchableOpacity> */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalViewText}>
                                    Are you sure you want to logout?
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 15,
                                    }}>
                                    <TouchableOpacity onPress={handleConfirmLogout}>
                                        <View style={styles.LDlogoutBtn}>
                                            <Text style={styles.LDlogoutBtnText}>LOGOUT</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.modalBoxborder} />
                                    <TouchableOpacity onPress={handleCancelLogout}>
                                        <View style={styles.LDlogoutBtn}>
                                            <Text style={styles.LDlogoutBtnText}>CANCEL</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.moreBottomBox}>
                        <Text style={styles.developedText}>Developed by ♥</Text>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(website);
                            }}>
                            <Text style={styles.developedText}> TechCartel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    myProfileBox: {
        paddingHorizontal: 15,
    },
    myProfileTitle: {
        paddingVertical: 12,
        fontSize: 12,
        fontFamily: 'Hind-Bold',
        color: '#9e9e9e',
        textTransform: 'uppercase',
    },
    myProfileMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 12,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        marginBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
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
    myProfileLabel: {
        fontSize: 14,
        fontFamily: 'Baloo2-Bold',
        color: '#0c0c0c',
    },
    myProfileSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    myProfileMainIcon: {
        color: COLORS.white,
        fontSize: 18,
    },
    myProfileArrowIcon: {
        color: '#C6C6C6',
        fontSize: 25,
    },
    profile: {
        padding: 15,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileAvatarWrapper: {
        position: 'relative',
    },
    profileAvatar: {
        width: 72,
        height: 72,
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    profileAction: {
        position: 'absolute',
        right: -4,
        bottom: -10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 28,
        height: 28,
        borderRadius: 9999,
        backgroundColor: '#007bff',
    },
    profileName: {
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'Hind-Bold',
        color: '#414d63',
        textAlign: 'center',
    },
    // modal box
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowcolor: COLORS.dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalViewText: {
        marginVertical: 10,
        fontSize: 13,
        textAlign: 'center',
        color: COLORS.dark,
        fontFamily: 'Baloo2-Bold',
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
    moreBottomBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    developedText: {
        fontSize: 13,
        fontFamily: 'Baloo2-Bold',
        color: '#9e9e9e',
        textAlign: 'center',
    },
});
