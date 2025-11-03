import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import React from 'react';
import { COLORS } from '../../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderCommon from '../../components/HeaderCommon';
import RenderHtml from 'react-native-render-html';
import { screenHeight, screenWidth } from '../../utils/constent';
import { RFValue } from 'react-native-responsive-fontsize';

const GuestHouseDetailsScreen = ({ route }) => {
    const { guestHouse } = route.params;
    const { width } = Dimensions.get('window');

    const openWhatsApp = number => {
        Linking.openURL(`https://wa.me/${number}`);
    };

    const makeCall = number => {
        Linking.openURL(`tel:${number}`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
            <HeaderCommon headername={'Guest House Details'} />
            <View style={{ flex: 1, backgroundColor: COLORS.bg }}>

                <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                    <Image source={{ uri: guestHouse.image }} style={styles.image} />

                    <View style={styles.detailsBox}>
                        <Text style={styles.title}>{guestHouse.name}</Text>
                        <Text style={styles.subtitle}>{guestHouse.city}, {guestHouse.state}</Text>

                        <Text style={styles.contactText}>Contact Person: {guestHouse.contact_person}</Text>

                        {/* <View style={styles.infoRow}>
                            <Ionicons name="call-outline" size={20} color={COLORS.primary} />
                            <Text style={styles.infoText}>{guestHouse.contact_call}</Text>
                        </View> */}

                        {/* <View style={styles.infoRow}>
                            <FontAwesome name="whatsapp" size={20} color={'green'} />
                            <Text style={styles.infoText}>{guestHouse.contact_whatsapp}</Text>
                        </View> */}

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => makeCall(guestHouse.contact_call)}>
                                <Ionicons name="call" size={RFValue(15)} color={"#fff"} />
                                <Text style={styles.buttonText}> Call Now</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: 'green', marginRight: 0 }]}
                                onPress={() => openWhatsApp(guestHouse.contact_whatsapp)}>
                                <Text style={styles.buttonText}>💬 WhatsApp</Text>
                            </TouchableOpacity>
                        </View>

                        {guestHouse.desp ? (
                            <View style={{ marginTop: 20 }}>
                                <RenderHtml
                                    contentWidth={width}
                                    source={{ html: guestHouse.desp }}
                                />
                            </View>
                        ) : null}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default GuestHouseDetailsScreen;

const styles = StyleSheet.create({
    container: {
        paddingBottom: screenHeight * 3,
        backgroundColor: COLORS.bg,
    },
    image: {
        width: '100%',
        height: screenHeight * 30,
        resizeMode: 'cover',
    },
    detailsBox: {
        padding: screenWidth * 4,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: screenWidth * 3,
        borderTopRightRadius: screenWidth * 3,
        marginTop: 0,
    },
    title: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
        color: COLORS.black,
        marginBottom: 6,
    },
    subtitle: {
        fontSize: RFValue(12),
        color: '#444',
        marginBottom: screenHeight,
    },
    contactText: {
        fontSize: RFValue(12),
        color: '#333',
        marginBottom: screenHeight,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: screenHeight * 1.4,
    },
    infoText: {
        fontSize: RFValue(12),
        marginLeft: screenWidth * 2,
        color: COLORS.primary,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: screenHeight * 1.3,
        gap: screenWidth * 3
    },
    button: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: screenHeight * 5,
        borderRadius: screenWidth * 2
    },
    buttonText: {
        textAlign: 'center',
        color: COLORS.white,
        fontWeight: '600',
        fontSize: RFValue(12),
    },
});
