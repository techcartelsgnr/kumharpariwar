import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Share as RNShare,
  RefreshControl,
  PermissionsAndroid,
  Platform,
  Alert,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import StatusBarPage from '../../components/StatusBarPage';
// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import Slider from '../../components/Slider';
import navigationStrings from '../../utils/navigationStrings';
import BusinessData from '../../components/BusinessData';
import {
  fetchSlider,
  resetSlider,
  fetchBusinessCategories,
} from '../../redux/slices/homePageSlice';
import {
  fetchCities,
  fetchReferMessage,
  fetchThoughtOfTheDay,
} from '../../redux/slices/MoreRepoSlice';
import {
  fetchBusinessCategoriesSlice,
  fetchSliderSlice,
} from '../../redux/slices/homeSlice';
import { COLORS } from '../../theme/theme';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [sliderData, setSliderData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const navigation = useNavigation();
  const { token } = useSelector(state => state.auth);
  const { pending } = useSelector(state => state.home);
  const { referMessage, thoughtOfTheDay } = useSelector(state => state.reports);
  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
  }, []);
  const baseUrl = 'https://kumharpariwar.com/';
  console.log('refessalreferMessage', referMessage)

  const getFullImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${baseUrl}${path}`;
  };

  const fetchSliderData = async () => {
    try {
      const res = await dispatch(fetchSliderSlice()).unwrap();
      console.log('res.lider', res.data.slider)
      setSliderData(res.data.slider);
    } catch (error) {
      console.log('ERROR IN SLIDER FETCH', error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const res = await dispatch(fetchBusinessCategoriesSlice()).unwrap();
      setCategoryData(res.data.businesscategory);
    } catch (error) {
      console.log('ERROR IN fetchBusinessCategoriesSlice FETCH', error);
    }
  };

  useEffect(() => {
    fetchSliderData();
    fetchCategoryData();
  }, []);

  const onRefresh = () => {
    dispatch(resetSlider());
    dispatch(fetchSlider({ token }));
    dispatch(fetchThoughtOfTheDay({ token }));
    dispatch(fetchReferMessage({ token }));
    dispatch(fetchCities({ token }));
    dispatch(fetchBusinessCategories({ token }));
    fetchCategoryData();
  };

  // Request storage permission for Android versions
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const androidVersion = parseInt(Platform.constants.Release);
      try {
        if (androidVersion >= 13) {
          const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
          return result === RESULTS.GRANTED;
        }
        if (androidVersion >= 11) return true;

        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download images.',
            buttonPositive: 'Allow',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.warn('Permission error', error);
        return false;
      }
    }
    return true; // iOS always true
  };

  // ✅ Download image to device storage
  const downloadImage = async (imagePath) => {
    try {
      const fullImageUrl = getFullImageUrl(imagePath);
      if (!fullImageUrl) {
        Alert.alert('Error', 'Invalid image URL');
        return;
      }

      const permissionGranted = await requestStoragePermission();
      if (!permissionGranted) {
        Alert.alert('Permission Denied', 'Storage permission is required.');
        return;
      }

      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0];
      const fileName = `Thought_of_the_day_${formattedDate}.jpg`;

      const downloadPath =
        Platform.OS === 'android'
          ? `${RNFS.DownloadDirectoryPath}/${fileName}`
          : `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const downloadResult = await RNFS.downloadFile({
        fromUrl: fullImageUrl,
        toFile: downloadPath,
      }).promise;

      if (downloadResult.statusCode === 200) {
        Toast.show({
          text1: '✅ Image Downloaded Successfully!',
          type: 'success',
        });
        console.log('✅ Image saved to:', downloadPath);
      } else {
        Alert.alert('Error', 'Failed to download image.');
      }
    } catch (error) {
      console.log('Download error:', error);
      Alert.alert('Error', 'Failed to download image.');
    }
  };

  // ✅ Share image function
  const shareImage = async () => {
    try {
      const fullImageUrl = getFullImageUrl(thoughtOfTheDay?.image);
      if (!fullImageUrl) {
        Alert.alert('Error', 'Invalid image URL');
        return;
      }

      const permissionGranted = await requestStoragePermission();
      if (!permissionGranted) {
        Alert.alert('Permission Denied', 'Storage permission is required.');
        return;
      }

      const fileName = `share_image_${Date.now()}.jpg`;
      const imagePath = `${RNFS.CachesDirectoryPath}/${fileName}`;

      // Download the image first to cache
      const downloadResult = await RNFS.downloadFile({
        fromUrl: fullImageUrl,
        toFile: imagePath,
      }).promise;

      if (downloadResult.statusCode !== 200) {
        throw new Error('Image download failed');
      }

      const shareOptions = {
        title: 'कुम्हार परिवार',
        message:
          'कुम्हार परिवार एप्प डाउनलोड करने के लिए विजिट करें: https://kumharpariwar.com',
        url: Platform.OS === 'android' ? 'file://' + imagePath : imagePath,
        type: 'image/jpeg',
      };

      await Share.open(shareOptions);
      setTimeout(() => RNFS.unlink(imagePath).catch(() => { }), 3000);
    } catch (error) {
      console.log('Error sharing image:', error);
      Alert.alert('Error', 'Failed to share image.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
      <StatusBar
        animated={true}
        backgroundColor={COLORS.blue} // Android background
        barStyle="light-content" // white text/icons for dark background
        translucent={false} // ensures content not under status bar
      />

      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <Header name={'Welcome Back'} />

        <ScrollView
          nestedScrollEnabled={true}
          style={{ width: '100%' }}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={pending} />
          }>
          {/* Slider Section */}
          <View style={{ marginTop: 10 }}>
            {sliderData.length > 0 && <Slider sliderData={sliderData} />}
          </View>

          {/* Categories Section */}
          <View style={{ marginTop: 0 }}>
            <View style={styles.homecontentHeader}>
              <Text style={styles.homecontentTitle}>Categories</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(navigationStrings.ALLBUSINESSLIST)
                }>
                <Text style={styles.homecontentLink}>See all</Text>
              </TouchableOpacity>
            </View>
            <BusinessData categoryData={categoryData} />
          </View>

          {/* Share App Section */}
          <View style={styles.shareAppHome}>
            <TouchableOpacity
              style={styles.shareAppBox}
              onPress={async () => await RNShare.share({ message: referMessage })}>
              <Ionicons name="share" style={styles.shareAppIcon} />
              <Text style={styles.shareAppText}>Share App Now</Text>
            </TouchableOpacity>
          </View>

          {/* Thought of the Day Section */}
          {/* Thought of the Day Section */}
          <View style={styles.quotesBox}>
            <Text style={styles.quotesHeading}>आज का सुविचार</Text>
            <View style={styles.quotesMainBox}>
              <View style={styles.quotesImageOuter}>
                <Image
                  source={{
                    uri: getFullImageUrl(thoughtOfTheDay?.image),
                  }}
                  style={styles.quotesImage}
                />
              </View>

              <View style={styles.quotesBoxRight}>
                <TouchableOpacity
                  onPress={() => downloadImage(thoughtOfTheDay?.image)}>
                  <Text style={styles.quotesRightText}>Download</Text>
                  <View style={styles.quotesBoxRightSocialBox}>
                    <Ionicons name="download" style={styles.businessSubCatIcon} />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ marginTop: 20 }} onPress={shareImage}>
                  <Text style={styles.quotesRightText}>Share</Text>
                  <View style={styles.quotesBoxRightSocialBox}>
                    <Ionicons name="share" style={styles.businessSubCatIcon} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  quotesBox: {
    backgroundColor: COLORS.pink,
    padding: 20,
  },
  quotesHeading: {
    color: COLORS.white,
    fontFamily: 'Hind-Bold',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  quotesMainBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 50
  },
  quotesImageOuter: {
    width: '80%',
  },
  quotesImage: {
    height: 250,
    width: 250,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  quotesBoxRight: {
    width: '20%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quotesBoxRightSocialBox: {
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 5,
    width: 40,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  quotesRightText: {
    color: COLORS.white,
    fontFamily: 'Hind-Medium',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
  },
  businessSubCatIcon: {
    color: COLORS.red,
    fontSize: 22,
    alignSelf: 'center',
  },
  shareAppHome: {
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  shareAppBox: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.pink,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: COLORS.white,
    elevation: 1,
    shadowColor: COLORS.blue,
  },
  shareAppIcon: {
    color: COLORS.white,
    fontSize: 25,
    alignSelf: 'center',
  },
  shareAppText: {
    color: COLORS.white,
    fontFamily: 'Baloo2-Bold',
    fontSize: 20,
    lineHeight: 32,
    marginLeft: 10,
  },
  homecontentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    marginHorizontal: 15,
  },
  homecontentTitle: {
    fontSize: 13,
    fontFamily: 'Baloo2-Bold',
    color: '#1a2525',
  },
  homecontentLink: {
    fontSize: 13,
    fontFamily: 'Baloo2-Bold',
    color: '#1a2525',
  },
});

export default HomeScreen;
