import React, {useEffect, useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  RefreshControl,
} from 'react-native';
import RenderHtml from 'react-native-render-html';

// api
import {useSelector, useDispatch} from 'react-redux';
import { COLORS } from '../../theme/theme';
import StatusBarPage from '../../components/StatusBarPage';
import { fetchAbout } from '../../redux/slices/MoreRepoSlice';
import HeaderCommon from '../../components/HeaderCommon';

export default function Terms() {
  const {width} = useWindowDimensions();
  const {token} = useSelector(state => state.auth);
  const {aboutus} = useSelector(state => state.reports);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchAbout({token})).then(() => setRefreshing(false));
  }, [dispatch, token]);

  useEffect(() => {
    dispatch(fetchAbout({token}));
  }, []);

  return (
      <SafeAreaView
        style={{flex: 1, paddingBottom: 10, backgroundColor: COLORS.blue}}>
        <HeaderCommon headername="About Kumhar Pariwar" />
        <ScrollView
          contentContainerStyle={{flexGrow: 1, backgroundColor: COLORS.white}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#090979']} // Color of the refresh indicator
            />
          }>
          <View style={styles.aboutBox}>
            <RenderHtml
              contentWidth={width}
              source={{html: aboutus}}
              baseStyle={styles.aboutContentText}
              tagsStyles={tagsStyles}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

  );
}

const tagsStyles = {
  p: {
    margin: 0, // Remove margins for paragraphs
    paddingTop: 5,
    paddingBottom: 5,
  },
  h1: {
    margin: 0,
    paddingTop: 5,
  },
  h2: {
    margin: 0,
    padding: 0,
  },
  ul: {
    margin: 0,
    paddingLeft: 20, // Example: Indent list items
  },
  ol: {
    margin: 0,
    paddingLeft: 20, // Example: Indent list items
  },
  // Add more tag styles as needed
};

const styles = StyleSheet.create({
  aboutBox: {
    // marginHorizontal: 10,
    backgroundColor: COLORS.white,
  },
  aboutContentText: {
    fontSize: 12,
    color: COLORS.dark,
    padding: 10,
    // fontFamily: 'Baloo2-Bold', // No need to specify here if inline styles are used in terms
  },
});
