import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Share,
  RefreshControl,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Shared from 'react-native-share';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

// Redux imports
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import StatusBarPage from '../../components/StatusBarPage';
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

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [sliderData, setSliderData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const navigation = useNavigation();
  const { token } = useSelector((state) => state.auth);
  const { pending } = useSelector((state) => state.home);
  const { referMessage, thoughtOfTheDay } = useSelector((state) => state.reports);
  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
  }, []);

  const fetchSliderData = async () => {
    try {
      const res = await dispatch(fetchSliderSlice()).unwrap();
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

  // Request storage permission
  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const androidVersion = parseInt(Platform.constants.Release);
      try {
        if (androidVersion >= 13) {
          const result = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
          return result === RESULTS.GRANTED;
        }

        if (androidVersion >= 11) {
          return true;
        }

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
    return true; // iOS
  };

  // ✅ Image download handler (using RNFS only)
  const downloadImage = async (imageUrl) => {
    try {
      const permissionGranted = await requestStoragePermission();
      if (!permissionGranted) {
        Alert.alert('Permission Denied', 'Storage permission is required.');
        return;
      }

      const date = new Date();
      const formattedDate = date.toISOString().split('T')[0];
      const fileName = `Thought_of_the_day_${formattedDate}.jpg`;

      let downloadPath = '';
      if (Platform.OS === 'android') {
        downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`;
      } else {
        downloadPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      }

      const downloadResult = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: downloadPath,
      }).promise;

      if (downloadResult && downloadResult.statusCode === 200) {
        Toast.show({
          text1: 'Image Downloaded Successfully!',
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

  // ✅ Image share handler (RNFS only, no rn-fetch-blob)
  const shareImage = async () => {
    try {
      const imagePath = `${RNFS.CachesDirectoryPath}/image.jpg`;

      // Download the image first
      await RNFS.downloadFile({
        fromUrl: thoughtOfTheDay,
        toFile: imagePath,
      }).promise;

      const base64Image = await RNFS.readFile(imagePath, 'base64');

      const shareOptions = {
        message:
          'कुम्हार परिवार एप्प डाउनलोड करने के लिए विजिट करें: https://kumharpariwar.com',
        url: `data:image/jpeg;base64,${base64Image}`,
      };

      await Shared.open(shareOptions);
    } catch (error) {
      console.log('Error sharing image:', error);
      Alert.alert('Error', 'Failed to share image.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
      <StatusBarPage />
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <SafeAreaView style={styles.container}>
          <Header name={'Sourabh Duharia'} />
          <ScrollView
            nestedScrollEnabled={true}
            style={{ width: '100%' }}
            refreshControl={
              <RefreshControl onRefresh={onRefresh} refreshing={pending} />
            }>
            <View style={{ marginTop: 10 }}>
              {sliderData.length > 0 && <Slider sliderData={sliderData} />}
            </View>

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

            <View style={styles.shareAppHome}>
              <TouchableOpacity
                style={styles.shareAppBox}
                onPress={async () => await Share.share({ message: referMessage })}>
                <Ionicons name="share" style={styles.shareAppIcon} />
                <Text style={styles.shareAppText}>Share App Now</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.quotesBox}>
              <Text style={styles.quotesHeading}>आज का सुविचार</Text>
              <View style={styles.quotesMainBox}>
                <View style={styles.quotesImageOuter}>
                  <Image
                    source={{
                      uri:
                        thoughtOfTheDay ||
                        'https://kumharpariwar.com/storage/slider/1745584801.jpg',
                    }}
                    style={styles.quotesImage}
                  />
                </View>
                <View style={styles.quotesBoxRight}>
                  <TouchableOpacity onPress={() => downloadImage(thoughtOfTheDay)}>
                    <Text style={styles.quotesRightText}>Download</Text>
                    <View style={styles.quotesBoxRightSocialBox}>
                      <Ionicons
                        name="download"
                        style={styles.businessSubCatIcon}
                      />
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
        </SafeAreaView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
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
    paddingHorizontal: 10,
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
