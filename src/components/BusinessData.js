import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../theme/theme';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBusinessCategories} from '../redux/slices/homePageSlice';
import navigationStrings from '../utils/navigationStrings';

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
        row.push({key: `blank-${dataIndex}`, empty: true});
      }
    }
    formattedData.push(row);
  }
  console.log('formattedData========>', formattedData);
  return formattedData;
};

const BusinessData = ({categoryData}) => {
  const {businesscatArray, pending, error} = useSelector(state => state.home);
  const limitedData = categoryData.slice(0, 8);
  const navigation = useNavigation();

  if (pending) {
    return (
      <Text
        style={{
          fontFamily: 'Baloo2-Bold',
          fontSize: 12,
          textAlign: 'center',
          marginBottom: 10,
        }}>
        Loading...
      </Text>
    );
  }

  if (error) {
    return (
      <Text
        style={{
          fontFamily: 'Baloo2-Bold',
          fontSize: 12,
          textAlign: 'center',
          marginBottom: 10,
        }}>
        Error loading data: {error}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      {formatData(limitedData, numColumns).map((row, rowIndex) => (
        <View key={rowIndex} style={styles.servicerow}>
          {row.map((item, columnIndex) => {
            // console.log("items======>", item)
            const icon = item.icon;
            return (
              <View
                key={columnIndex}
                style={[
                  styles.serviceitem,
                  item.empty && styles.itemInvisible,
                  {width: Dimensions.get('screen').width / numColumns},
                ]}>

                  <TouchableOpacity
                    style={styles.newCategoryInnerBox}
                    onPress={() => {
                      // console.log('in the button click', item.business_id);
                      navigation.navigate(navigationStrings.DIRECTORYLISTS, {
                        business_id: item.id,
                        headerName: item.name,
                      });
                    }}>
                    <View style={styles.catimageurlBox}>
                      <Image
                        source={{
                          uri: icon,
                        }}
                        style={styles.newCatImage}
                      />
                    </View>
                    <Text style={styles.newCatName}>{item.name}</Text>
                  </TouchableOpacity>

              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  servicerow: {
    flexDirection: 'row',
  },
  serviceitem: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  newCategoryInnerBox: {
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
    height: 30,
    width: 30,
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
});

export default BusinessData;
