import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/theme';
import HeaderCommon from '../../components/HeaderCommon';
import { useDispatch, useSelector } from 'react-redux';
import { getGallery } from '../../redux/slices/MoreRepoSlice';

const { width, height } = Dimensions.get('window');

const GalleryScreen = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);

  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const res = await dispatch(getGallery({ token }));
        if (res?.payload?.data) {
          setGalleryData(res.payload.data);
        } else {
          setGalleryData([]);
        }
      } catch (error) {
        console.log('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [dispatch, token]);

  const openImage = (item) => {
    setSelectedImage(item);
    setModalVisible(true);
  };

  const closeImage = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  const handleDownload = () => {
    if (!selectedImage) return;
    Alert.alert(
      'Download Image',
      `Do you want to download "${selectedImage.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: () => Alert.alert('Success', 'Image downloaded successfully!'),
        },
      ]
    );
  };

  const renderGalleryItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.galleryItem, index % 3 !== 2 && styles.itemSpacing]}
      onPress={() => openImage(item)}
    >
      <Image source={{ uri: item.file_path }} style={styles.galleryImage} />
      {/* <View style={styles.imageOverlay}>
        <Text style={styles.imageTitle} numberOfLines={1}>
          {item.title || 'Untitled'}
        </Text>
      </View> */}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.blue} barStyle="light-content" />
      <View style={{flex: 1 , backgroundColor: COLORS.white}}>
        <HeaderCommon headername="Gallery" />

       
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={{ marginTop: 10, color: COLORS.textcolor }}>Loading Gallery...</Text>
            </View>
          ) : galleryData.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No images available</Text>
            </View>
          ) : (
            <FlatList
              data={galleryData}
              renderItem={renderGalleryItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              contentContainerStyle={styles.galleryContainer}
              showsVerticalScrollIndicator={false}
            />
          )}

          {/* Image Modal */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={closeImage}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.modalBackground} onPress={closeImage} />

              <View style={styles.modalContent}>
                {selectedImage && (
                  <>
                    <View style={styles.modalImageContainer}>
                      <Image
                        source={{ uri: selectedImage.file_path }}
                        style={styles.modalImage}
                        resizeMode="contain"
                      />
                    </View>
                    <View style={styles.imageInfo}>
                      <View style={styles.textContainer}>
                        <Text style={styles.modalTitle}></Text>
                        <Text style={styles.modalDate}>
                          {/* {new Date(selectedImage.created_at).toDateString()} */}
                        </Text>
                      </View>
                      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
                        <Text style={styles.downloadButtonText}>⬇️ Download</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                <TouchableOpacity style={styles.closeButton} onPress={closeImage}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },
  galleryContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
  },
  galleryItem: {
    flex: 1,
    margin: 4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    elevation: 3,
  },
  itemSpacing: {
    marginRight: 4,
  },
  galleryImage: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.gray,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 6,
  },
  imageTitle: {
    color: COLORS.dark,
    fontSize: 12,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.85,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    overflow: 'hidden',
  },
  modalImageContainer: {
    flex: 1,
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  imageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  textContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  modalDate: {
    fontSize: 13,
    color: COLORS.textcolor,
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  downloadButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: COLORS.textcolor,
    fontSize: 16,
  },
});

export default GalleryScreen;
