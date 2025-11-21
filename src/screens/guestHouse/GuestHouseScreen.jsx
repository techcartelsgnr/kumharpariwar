import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Linking,
    ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import HeaderCommon from '../../components/HeaderCommon';
import { COLORS } from '../../theme/theme';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getAllGuestHouseSlice } from '../../redux/slices/homeSlice';
import { SafeAreaView } from 'react-native-safe-area-context';

const GuestHouseScreen = () => {
    const dispatch = useDispatch();
    const nav = useNavigation();

    const [guestHouses, setGuestHouses] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const openWhatsApp = (number) => {
        Linking.openURL(`https://wa.me/${number}`);
    };

    const makeCall = (number) => {
        Linking.openURL(`tel:${number}`);
    };

    const getAllGuestHouse = async (pageNumber = 1) => {
        if (loading || !hasMore) return;
    
        setLoading(true);
        try {
            const res = await dispatch(getAllGuestHouseSlice(pageNumber)).unwrap();
            const data = res?.data?.guesthouse;
    
            console.log("get house data=======>", data);
    
            if (data?.data?.length > 0) {
                if (pageNumber === 1) {
                    setGuestHouses(data.data);
                } else {
                    setGuestHouses(prev => [...prev, ...data.data]);
                }
    
                // ✅ Check if it's the last page
                if (data.current_page >= data.last_page) {
                    setHasMore(false); // No more pages
                } else {
                    setPage(pageNumber + 1); // Load next page
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log('Pagination Error:', error);
        } finally {
            setLoading(false);
        }
    };

  

    // useFocusEffect(useCallback(()=>{
    //     setGuestHouses([])
    //     getAllGuestHouse(1);

    // },[]))
useEffect(()=>{
    // setGuestHouses([])
    getAllGuestHouse(1);
},[])


    const renderItem = ({ item }) => (
        <TouchableOpacity
          onPress={() => nav.navigate("GusetHouseDetailsScreen", { guestHouse: item })}
          style={styles.card}
        >
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.title}>{item.name}</Text>
      
            <Text style={styles.desc}>{item.city}, {item.state}</Text>
      
            <Text style={styles.desc}>
              Contact Person: <Text style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{item.contact_person}</Text>
            </Text>
      
            <View style={styles.contactRow}>
              <TouchableOpacity onPress={() => makeCall(item.contact_call)}>
                <View style={styles.iconText}>
                  <Ionicons name="call-outline" size={18} color={COLORS.primary} />
                  <Text style={styles.contactText}> {item.contact_call}</Text>
                </View>
              </TouchableOpacity>
      
              <TouchableOpacity onPress={() => openWhatsApp(item.contact_whatsapp)}>
                <View style={styles.iconText}>
                  <FontAwesome name="whatsapp" size={18} color="green" />
                  <Text style={styles.contactText}> {item.contact_whatsapp}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
            <HeaderCommon headername={'Guest House'} />
            <View style={{ flex: 1, backgroundColor: COLORS.white, padding: 10 }}>
                <FlatList
                    data={guestHouses}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={() => {
                        if (hasMore && !loading) {
                            getAllGuestHouse(page);
                        }
                    }}                
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        loading ? <ActivityIndicator size="small" color={COLORS.primary} style={{ marginVertical: 10 }} /> : null
                    }
                    ListEmptyComponent={
                        !loading && (
                            <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
                                कोई गेस्ट हाउस नहीं मिला।
                            </Text>
                        )
                    }
                    refreshing={page === 1 && loading}
                    onRefresh={() => {
                        setGuestHouses([]);
                        setPage(1);
                        setHasMore(true);
                        getAllGuestHouse(1);
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default GuestHouseScreen;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#E5E7EB",
        borderRadius: 14,
        marginBottom: 18,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.10,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },

    image: {
        width: "100%",
        height: 180,
        resizeMode: "cover",
    },

    details: {
        padding: 14,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A1A1A",   // clean black
        marginBottom: 6,
    },

    desc: {
        fontSize: 14,
        color: "#6B7280",   // soft gray
        marginBottom: 8,
    },

    contactRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        marginTop: 10,
        // paddingTop: 8,
        paddingTop: 14,
        // paddingVertical:5,
        borderTopWidth: 1,
        borderTopColor: "#ccc", // very light grey line
    },

    iconText: {
        flexDirection: "row",
        alignItems: "center",
    },

    contactText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1D4ED8",   // modern blue
    },
});

