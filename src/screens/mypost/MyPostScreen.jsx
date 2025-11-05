import React, { useCallback, useEffect, useState } from 'react';
import {
   
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    RefreshControl,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import StatusBarPage from '../../components/StatusBarPage';
import { deleteNewsByUser, fetchNewsByUser, resetNewsByUser } from '../../redux/slices/MoreRepoSlice';
import HeaderCommon from '../../components/HeaderCommon';
import navigationStrings from '../../utils/navigationStrings';
import { COLORS } from '../../theme/theme';
import { fullWidth, screenWidth } from '../../utils/constent';
import { fetchNewsByUserSlice } from '../../redux/slices/homeSlice';
import RenderHtml from 'react-native-render-html';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function MyPostScreen() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const handlePressNewsItem = newsItem => {
        navigation.navigate(navigationStrings.EDITNEWS, { newsItem });
    };
    const { token } = useSelector(state => state.auth);
    const {
        pending,
        allNewsByUser = [],
        nextPageNewsListing,
    } = useSelector(state => state.reports);
    const [myNewsData, setMyNewsData] = useState([])

    const dispatch = useDispatch();


    useFocusEffect(
        useCallback(() => {
            onRefresh();
        }, [])
    )

    const [newsId, setNewsId] = useState(null);
    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleConfirmDelete = async () => {
        if (!pending) {
            console.log(newsId);
            const response = await dispatch(
                deleteNewsByUser({ token, news_id: newsId }),
            );
            console.log(response.payload.message);
            if (response.payload.message) {
                onRefresh();
                setModalVisible(false);
            } else {
                setModalVisible(false);
                return;
            }
        }
    };

    const handleDelete = item => {
        setNewsId(item.id);
        setModalVisible(true);
    };


    const fetchUserNews = async (page = 1, isRefresh = false) => {
        if (!isRefresh) setLoading(true);
        // ✅ दुबारा उसी पेज को fetch करने से रोकें
        if (page === currentPage && !isRefresh) {
            setLoading(false);
            return;
        }
        try {
            const res = await dispatch(fetchNewsByUserSlice(page)).unwrap();
            console.log("res for user news fetch", res)
            const responseData = res.data.news

            setLastPage(responseData.last_page);
            setCurrentPage(responseData.current_page);

            if (isRefresh) {

                setMyNewsData(responseData.data)
            } else {
                setMyNewsData(prev => [...prev, ...responseData.data]);
            }

        } catch (error) {
            console.log("ERROR IN MY POST SCREEN", error)
        } finally {
            if (isRefresh) setRefreshing(false);
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            setMyNewsData([]);
            fetchUserNews(1, true)
        }, [])
    )


    const onRefresh = () => {
        setRefreshing(true);
        setMyNewsData([]);
        fetchUserNews(1, true);
    };

    const loadmoreItems = () => {
        if (currentPage < lastPage && !loading) {
            const nextPage = currentPage + 1;
            fetchUserNews(nextPage);
        }
    };

    const renderLoader = () => {
        return currentPage < lastPage ? (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="red" />
            </View>
        ) : null;
    };



    const renderItem = ({ item }) => {
        const description = item.desp.slice(0, 300) || '';
        const imageUrl = item.image;
        const title = item.title || 'No Title';
        const createdAt = item.created_date || 'No Date';

        return (
            <View activeOpacity={0.9} style={styles.newsSection}>
                <View style={styles.newsTopSection}>
                    <View style={styles.newsLeft}>
                        {imageUrl ? (
                            <Image source={{ uri: item.image }} style={styles.newsImage} />
                        ) : (
                            <View style={styles.newsImage} /> // Placeholder if no image
                        )}
                    </View>
                    <View style={styles.newsRight}>
                        <Text numberOfLines={2} style={styles.newsCateLabel}>
                            {title}
                        </Text>

                        <RenderHtml
                                      contentWidth={fullWidth}
                                      source={{ html: description }}
                                    />
                        
                    </View>
                </View>
                <View style={styles.newsBottomSection}>
                    <View style={styles.newsBottomLeft}>
                        <Text style={styles.newsDateLabel}>{createdAt}</Text>
                    </View>
                    <View style={styles.newsBottomRight}>
                        <TouchableOpacity onPress={() => handlePressNewsItem(item)}>
                            <Text style={styles.newsReadMoreLabel}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePressNewsItem(item)}>
                            <Feather name="edit-3" style={styles.newsBottomIcon} />
                        </TouchableOpacity>
                        <View style={{ marginLeft: 10 }} />
                        <TouchableOpacity
                            onPress={() => {
                                handleDelete(item);
                            }}>
                            <Text style={styles.newsDateLabel}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleDelete(item);
                            }}>
                            <Ionicons name="trash-outline" style={styles.trachIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.blue }]}>

            {/* <StatusBarPage /> */}
            <HeaderCommon headername="My Posts" />
            <View style={[styles.newsBox, { backgroundColor: COLORS.white, }]}>
                {pending && !myNewsData.length ? (
                    <View style={styles.centeredContainer}>
                        <ActivityIndicator
                            size="large"
                            color={"red"}
                            animating={true}
                            style={styles.activityIndicator}
                        />
                    </View>
                ) : myNewsData.length ? (
                    <FlatList
                        data={myNewsData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        numColumns={1}
                        showsVerticalScrollIndicator={true}
                        ListFooterComponent={renderLoader}
                        onEndReached={loadmoreItems}
                        onEndReachedThreshold={0}
                        refreshControl={
                            <RefreshControl refreshing={pending} onRefresh={onRefresh} />
                        }
                        contentContainerStyle={{ padding: screenWidth * 2 }}
                    />
                ) : (
                    <View style={styles.centeredContainer}>
                        <Text style={styles.noRecordText}>No Record Found</Text>
                    </View>
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalViewText}>
                            Are you sure you want to Delete this Post?
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginBottom: 15,
                            }}>
                            <TouchableOpacity onPress={handleConfirmDelete}>
                                <View style={styles.LDlogoutBtn}>
                                    <Text style={styles.LDlogoutBtnText}>DELETE</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: 10 }} />
                            <TouchableOpacity onPress={handleCancel}>
                                <View style={styles.LDlogoutBtn}>
                                    <Text style={styles.LDlogoutBtnText}>CANCEL</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>

    );
}

const tagsStyles = {
    p: {
        margin: 0,
        paddingTop: 5,
        paddingBottom: 5,
        fontSize: 12,
        fontFamily: 'Baloo2-Bold',
        color: COLORS.dark,
    },
    h1: {
        margin: 0,
        paddingTop: 5,
        fontSize: 18,
        fontFamily: 'Baloo2-Bold',
        color: COLORS.dark,
    },
    h2: {
        margin: 0,
        paddingTop: 5,
        fontSize: 16,
        fontFamily: 'Baloo2-Bold',
        color: COLORS.dark,
    },
    ul: {
        margin: 0,
        paddingLeft: 20,
        fontSize: 12,
        fontFamily: 'Baloo2-Bold',
        color: COLORS.dark,
    },
    ol: {
        margin: 0,
        paddingLeft: 20,
        fontSize: 12,
        fontFamily: 'Baloo2-Bold',
        color: COLORS.dark,
    },
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    newsBox: {
        flex: 1,
        // marginHorizontal: 10,
        // marginTop: 10,
        paddingBottom: 10,
    },
    newsSection: {
        padding: 15,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: COLORS.red,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 1.84,
        elevation: 1,
    },
    newsTopSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    newsLeft: {
        width: '30%',
    },
    newsImage: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    newsRight: {
        width: '66%',
        paddingLeft: 10,
    },
    newsCateLabel: {
        fontSize: 14,
        fontFamily: 'Baloo2-Bold',
        color: COLORS.pink,
    },
    newsDescription: {
        fontSize: 12,
        fontFamily: 'Baloo2-Bold',
        color: COLORS.dark,
    },
    newsBottomSection: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    newsBottomLeft: {},
    newsDateLabel: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Roboto-Bold',
        color: COLORS.pink,
    },
    newsBottomRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    newsReadMoreLabel: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Roboto-Bold',
        color: COLORS.primary,
    },
    newsBottomIcon: {
        fontSize: 15,
        color: COLORS.primary,
        paddingLeft: 5,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        borderColor: '#fefefe',
    },
    noRecordText: {
        color: COLORS.blue,
        fontFamily: 'Baloo2-Bold',
        fontSize: 14,
    },
    loaderContainer: {
        justifyContent: 'center',
    },
    trachIcon: {
        fontSize: 15,
        color: COLORS.pink,
        paddingLeft: 5,
    },
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
    },
    modalViewText: {
        marginVertical: 10,
        fontSize: 13,
        textAlign: 'center',
        color: COLORS.dark,
        fontFamily: 'Baloo2-Bold',
    },
});
