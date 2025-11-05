
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import StatusBarPage from '../../components/StatusBarPage';
import { COLORS } from '../../theme/theme';
import HeaderCommon from '../../components/HeaderCommon';
import { fetchNews } from '../../redux/slices/MoreRepoSlice';
import { fullWidth, screenWidth } from '../../utils/constent';
import { fetchNewsSlice } from '../../redux/slices/homeSlice';
import RenderHtml from 'react-native-render-html';
const NewsScreen = () => {
  const navigation = useNavigation();
  const [newsData, setNewsData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);




  const handlePressNewsItem = newsItem => {
    navigation.navigate('NewsDetails', { news_id: newsItem.id });
  };

  const { token } = useSelector(state => state.auth);
  const {
    pending,
    SubCatListingArray = [],
    nextPageSubCatListing,
  } = useSelector(state => state.reports);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   onRefresh();
  // }, []);

  // const onRefresh = () => {
  //   dispatch(fetchNews({ token }));
  // };

  // const renderLoader = () => {
  //   return nextPageSubCatListing !== null ? (
  //     <View style={styles.loaderContainer}>
  //       <ActivityIndicator size={20} color={COLORS.green} />
  //     </View>
  //   ) : null;
  // };

  // const loadmoreItems = () => {
  //   if (nextPageSubCatListing !== null) {
  //     dispatch(fetchNews({ token }));
  //   }
  // };


  const fetchNewsData = async (page = 1, isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);

      const res = await dispatch(fetchNewsSlice(page)).unwrap();
      console.log("news data print=======>", res)
      const responseData = res.data.news;

      setLastPage(responseData.last_page);
      setCurrentPage(responseData.current_page);

      if (isRefresh) {
        setNewsData(responseData.data);
      } else {
        setNewsData(prev => [...prev, ...responseData.data]);
      }
    } catch (error) {
      console.log("ERROR IN FETCH OUR PROUD DATA", error);
    } finally {
      if (isRefresh) setRefreshing(false);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setNewsData([]);
      fetchNewsData(1, true);
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    setNewsData([]);
    fetchNewsData(1, true);
  };

  const loadmoreItems = () => {
    if (currentPage < lastPage && !loading) {
      const nextPage = currentPage + 1;
      fetchNewsData(nextPage);
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
    const imageUrl = item.image
    const title = item.title || 'No Title';
    const createdAt = item.created_date || 'No Date';


    return (
      <View style={styles.newsSection}>
        <View style={styles.newsTopSection}>
          <View style={styles.newsLeft}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.newsImage} />
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
              <Text style={styles.newsReadMoreLabel}>Read More</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePressNewsItem(item)}>
              <Ionicons
                name="arrow-forward-circle-outline"
                style={styles.newsBottomIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: COLORS.blue }]}>

      {/* <StatusBarPage /> */}
      <HeaderCommon headername="Posts" />
      <View style={[styles.newsBox, { backgroundColor: COLORS.white }]}>
        {pending && !newsData.length ? (
          <View style={styles.centeredContainer}>
            <ActivityIndicator
              size="large"
              color={"red"}
              animating={true}
              style={styles.activityIndicator}
            />
          </View>
        ) : newsData.length ? (
          <FlatList
            data={newsData}
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
    </SafeAreaView>
  );
};

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
    fontSize: 20,
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
});

export default NewsScreen;
