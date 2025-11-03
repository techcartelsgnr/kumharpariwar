import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
// import StatusBarPage from './StatusBarPage';
// import {COLORS} from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import HeaderCommon from './HeaderCommon';
import Shared from 'react-native-share';
import RNFS from 'react-native-fs';
import { useDispatch, useSelector } from 'react-redux';
import HeaderCommon from '../../components/HeaderCommon';
import { COLORS } from '../../theme/theme';
import { newsById } from '../../redux/slices/MoreRepoSlice';
import StatusBarPage from '../../components/StatusBarPage';
import { fullWidth, screenHeight, screenWidth } from '../../utils/constent';
import { RFValue } from 'react-native-responsive-fontsize';
import RenderHTML from 'react-native-render-html';

const NewsDetails = ({ route }) => {
  const { news_id } = route.params;
  const { token } = useSelector(state => state.auth);
  const { pending, newsDetailById } = useSelector(state => state.reports);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(newsById({ token, news_id }));
  }, [dispatch, news_id, token]);

  // Conditionally render only when newsDetailById is available
  return (
    <View style={styles.container}>
      <StatusBarPage />
      <HeaderCommon headername="Post Details" />
      <View style={{ marginVertical: 5 }} />
      {pending ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator
            size="large"
            color={COLORS.blue}
            animating={true}
            style={styles.activityIndicator}
          />
        </View>
      ) : newsDetailById ? ( // Check if newsDetailById is not undefined
        <ScrollView style={styles.scrollView}>
          <View style={styles.newsDetailsContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: newsDetailById.image,
                }}
                style={styles.newsDetailsImage}
              />
            </View>
            <View style={styles.newsDetailsShareBox}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                onPress={async () => {
                  try {
                    const imageUrl = newsDetailById.image;
                    const localPath = `${RNFS.CachesDirectoryPath}/image.jpg`;

                    // Step 1: Download image
                    await RNFS.downloadFile({
                      fromUrl: imageUrl,
                      toFile: localPath,
                    }).promise;

                    // Step 2: Read image as base64
                    const base64Image = await RNFS.readFile(localPath, 'base64');

                    // Step 3: Share
                    const shareOptions = {
                      message: `${newsDetailById.title}\n\nऔर पोस्ट देखने के लिए विजिट करें: https://kumharpariwar.com`,
                      url: `data:image/jpeg;base64,${base64Image}`,
                    };

                    await Shared.open(shareOptions);
                  } catch (error) {
                    console.log('Error sharing image:', error);
                  }
                }}
              >
                <Ionicons
                  name="share-social-outline"
                  style={{ marginHorizontal: 5, color: '#757575', }}
                  size={RFValue(15)}
                />
                <Text>Share</Text>
              </TouchableOpacity>

            </View>
            <View style={styles.textContainer}>
              <Text style={styles.categoryLabel}>{newsDetailById.title}</Text>
              <Text style={{ alignSelf: 'flex-end', marginBottom: 5 }}>
                {newsDetailById.created_date}
              </Text>
              {/* <Text style={{ fontSize: 16, color: '#757575' }}>
                {newsDetailById.desp}
              </Text> */}
              <RenderHTML
                contentWidth={fullWidth}
                source={{ html: newsDetailById.desp }}
              />

              <Text style={{ fontSize: 16, color: '#757575', marginTop: screenHeight * 2 }}>
                Posted By :- {newsDetailById.author}
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <Text style={styles.errorText}>News details could not be loaded.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  newsDetailsContainer: {
    overflow: 'hidden', // Ensure the container clips the image overflow
  },
  imageContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden', // Clip image overflow within container
    position: 'relative',
  },
  newsDetailsImage: {
    height: 300, // Adjust the height as needed
    resizeMode: 'contain', // Ensure the image covers the entire area
  },
  textContainer: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius: 10,
  },
  categoryLabel: {
    fontSize: 18,
    fontFamily: 'Baloo2-Bold',
    color: COLORS.primary,
  },
  newsDetailsShareBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    borderRadius: 5,
  },
  newsDetailsShareIcon: {
    fontSize: 20,
    color: COLORS.blue,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicator: {
    borderColor: '#fefefe',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    margin: 10,
  },
});

export default NewsDetails;
