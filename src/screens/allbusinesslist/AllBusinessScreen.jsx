import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import navigationStrings from '../../utils/navigationStrings';
import StatusBarPage from '../../components/StatusBarPage';
import commanServices from '../../redux/services/commanServices';
import { COLORS } from '../../theme/theme';
import HeaderCommon from '../../components/HeaderCommon';
import { screenHeight } from '../../utils/constent';
import { fetchBusinessCategoriesSlice } from '../../redux/slices/homeSlice';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

const numColumns = 4;
const formatData = (data, numColumns) => {
  const numberOfRows = Math.ceil(data.length / numColumns);
  const formattedData = [];
  for (let i = 0; i < numberOfRows; i++) {
    const row = [];
    for (let j = 0; j < numColumns; j++) {
      const dataIndex = i * numColumns + j;
      if (dataIndex < data.length) {
        row.push(data[dataIndex]);
      } else {
        row.push({ key: `blank-${dataIndex}`, empty: true });
      }
    }
    formattedData.push(row);
  }
  return formattedData;
};

const AllBusinessScreen = ({ navigation }) => {
  const { token } = useSelector(state => state.auth);
  const { pending } = useSelector(state => state.home);
  const [businesslist, setbusinesslist] = useState('');
  const dispatch = useDispatch()


  const handleFetchAllCategory = async () => {
    try {
      const res = await dispatch(fetchBusinessCategoriesSlice()).unwrap()
      console.log("response all category===>", res)
      if (res.status_code == 200) {
        setbusinesslist(res.data.businesscategory);

      } else {
        Toast.show({
          text1: res.message,
          type: 'error'
        })
      }
    } catch (error) {
      console.log("ERROR IN FETCH ALL CATEGORY ", error)
    }
  }

  // fetch data on referesh
  const onRefresh = () => {
    handleFetchAllCategory()
  };
  useEffect(() => {
    handleFetchAllCategory()
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue }}>
      {/* <StatusBarPage /> */}
      {/* <HeaderCommon headername="All Categories" /> */}
      <HeaderCommon headername="All Categories" />
      <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={pending} />
          }>
          <View style={styles.allBusiCateBox}>
            {formatData(businesslist, numColumns).map((row, rowIndex) => (
              <View key={rowIndex} style={styles.servicerow}>
                {row.map((item, columnIndex) => (
                  <View
                    key={columnIndex}
                    style={[
                      styles.serviceitem,
                      item.empty && styles.itemInvisible,
                      { width: Dimensions.get('screen').width / numColumns },
                    ]}>
                    {!item.empty && (
                      <TouchableOpacity
                        style={[styles.newCategoryInnerBox]}
                        key={item.business_id}
                        onPress={() =>
                          navigation.navigate(navigationStrings.DIRECTORYLISTS, {
                            business_id: item.id,
                        headerName: item.name,
                          })
                        }>
                        <View style={[styles.catimageurlBox]}>
                          <Image
                            source={{ uri: item.icon }}
                            style={styles.newCatImage}
                          />
                        </View>
                        <Text style={styles.newCatName}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  allBusiCateBox: {
    marginTop: 15,
  },
  newCategoryInnerBox: {
    // width: Dimensions.get('window').width / numColumns - 12,
    // width: width * 0.21,
    // height: height * 0.11,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginHorizontal: 10,
  },
  catimageurlBox: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 1,
  },
  newCatImage: {
    height: 35,
    width: 35,
  },
  newCatName: {
    fontSize: 9,
    lineHeight: 16,
    textTransform: 'uppercase',
    color: COLORS.dark,
    marginTop: 8,
    fontFamily: 'Baloo2-Bold',
    textAlign: 'center',
  },
  servicerow: {
    flexDirection: 'row',
  },
  serviceitem: {
    alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
    // height: Dimensions.get('window').width / numColumns, // approximate a square
    marginBottom: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});

export default AllBusinessScreen;
