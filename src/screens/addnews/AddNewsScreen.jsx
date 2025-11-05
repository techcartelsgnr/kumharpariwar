import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';



import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

// api
import { useDispatch, useSelector } from 'react-redux';
import { addNews } from '../../redux/slices/MoreRepoSlice';
import HeaderCommon from '../../components/HeaderCommon';
import StatusBarPage from '../../components/StatusBarPage';
import { COLORS } from '../../theme/theme';
import InputField from '../../components/InputField';
import ButtonWithBlue from '../../components/ButtonForLogin';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddNewsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { token, image } = useSelector(state => state.auth);
  const { error, pending } = useSelector(state => state.reports);

  const [newsTitle, setNewsTitle] = useState('');
  const [newsDesc, setNewsDesc] = useState('');
  const [imageUri, setImageUri] = useState(
    `https://kumharpariwar.com/storage/news/${image}`,
  );

  const data = new FormData();

  // const handleSelectImage = () => {
  //   ImagePicker.openPicker({
  //     width: 1000,
  //     height: 1000,
  //     cropping: true,
  //   })
  //     .then(pickedImage => {
  //       console.log(pickedImage);
  //       if (pickedImage && pickedImage.path) {
  //         setImageUri(pickedImage.path);
  //       }
  //     })
  //     .catch(catchError => {
  //       console.log('Error selecting image Edit:', catchError);
  //     });
  // };



  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });

    if (result.assets && result.assets.length > 0) {
      const pickedImage = result.assets[0];
      const { uri, type, fileName } = pickedImage;

      setImageUri(uri); // For preview

      // ⛔️ Don't mutate directly, create a new FormData instance
      const newFormData = new FormData();
      newFormData.append('image', {
        uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
        type: type || 'image/jpeg',
        name: fileName || `photo_${Date.now()}.jpg`,
      });

      setImageData(newFormData);

    }
  };


  return (
    <>
      {/* <StatusBarPage /> */}
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
        <HeaderCommon headername="Add Post" />
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: COLORS.white }}>
          <View style={styles.editProfileform}>
            <View style={styles.editProfileforminput}>
              <InputField
                label={'Post Title'}
                value={newsTitle}
                onChangeText={setNewsTitle}
                icon={
                  <Ionicons
                    name="newspaper-outline"
                    style={styles.editProfileformIcon}
                  />
                }
                keyboardType="default"
              />
            </View>
            <View style={styles.editProfileforminput}>
              <TextInput
                multiline={true}
                value={newsDesc}
                numberOfLines={15}
                placeholder="Description"
                placeholderTextColor={COLORS.placeholder}
                style={styles.newsDescInputStyle}
                keyboardType="default"
                onChangeText={setNewsDesc}
              />
            </View>
            <Text
              style={{
                marginBottom: 5,
                color: '#000',
                fontFamily: 'ClashDisplay-Regular',
              }}>
              Upload Image
            </Text>
            <View style={styles.profile}>
              <TouchableOpacity onPress={handleImagePick}>
                <View style={styles.profileAvatarWrapper}>
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.profileAvatar}
                  />
                  <View style={styles.profileAction}>
                    <Feather color="#fff" name="edit-3" size={15} />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10 }}>
              <ButtonWithBlue
                text={'Save Post'}
                onPress={async () => {
                  if (!pending) {
                    data.append('title', newsTitle);
                    data.append('desp', newsDesc);
                    const filename = imageUri.split('/').pop();
                    const match = /\.(\w+)$/.exec(filename);
                    const type = match ? `image/${match[1]}` : 'image/jpeg';
                    data.append('image', {
                      uri: imageUri,
                      type: type,
                      name: filename,
                    });
                    console.log('Form-Data:', data);
                    const response = await dispatch(addNews({ token, data }));
                    if (response.payload.erors) {
                      console.log('Execution Done With Error ', pending, error);
                    }
                    if (response.payload.message) {
                      console.log(
                        'Execution Done Without Error ',
                        pending,
                        error,
                      );
                      navigation.goBack();
                    }
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  editProfileform: {
    margin: 15,
  },
  editProfileforminput: {
    marginBottom: 5,
  },
  editProfileformIcon: {
    color: COLORS.dark,
    fontSize: 22,
    marginRight: 5,
  },
  profile: {
    marginBottom: 10,
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
    width: 220,
    height: 180,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#007bff',
  },
  newsDescInputStyle: {
    backgroundColor: '#ffffff',
    borderColor: '#e1e1e3',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: 'flex-end',
    height: 200,
    textAlignVertical: 'top',
    color: COLORS.dark,
    fontFamily: 'ClashDisplay-Medium',
  },
});
