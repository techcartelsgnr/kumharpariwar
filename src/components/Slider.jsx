import React, { useRef, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import commanServices from '../redux/services/commanServices';
import { SafeAreaView } from 'react-native-safe-area-context';


export default BasicSlider = ({ sliderData = [] }) => {
  console.log("sliderData=====>", sliderData)
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dummySlider, setDummySlider] = useState(sliderData);
  const { token } = useSelector(state => state.auth);
  let { width: windowWidth, height: windowHeight } = useWindowDimensions();
  windowHeight = windowHeight * 0.25;

  // useEffect(() => {
  //   commanServices
  //     .getSlider({token})
  //     .then(res => {
  //       console.log('Slider API Response:', res);
  //       setDummySlider(res.images);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching slider images:', error);
  //     });
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        const nextIndex = (currentIndex + 1) % dummySlider.length;
        const targetX = nextIndex * windowWidth;
        scrollViewRef.current.scrollTo({ x: targetX, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, windowWidth, dummySlider]);

  return (
    <>
      <View style={[styles.scrollContainer, { height: windowHeight }]}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          style={styles.scrollViewStyle}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}>
          {dummySlider.map((slider, imageIndex) => {
            console.log("slider ===232323", slider)
            const img = slider.image
            return (
              <View key={imageIndex} style={{ width: windowWidth }}>
                <Image source={{ uri: `https://kumharpariwar.com/storage/slider/${img}` }} style={styles.card} />
              </View>
            )
          })}
        </ScrollView>
      </View>
      <View style={styles.indicatorContainer}>
        {dummySlider.map((image, imageIndex) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1),
            ],
            outputRange: [8, 16, 8],
            extrapolate: 'clamp',
          });

          const dotColor = scrollX.interpolate({
            inputRange: [
              windowWidth * (imageIndex - 1),
              windowWidth * imageIndex,
              windowWidth * (imageIndex + 1),
            ],
            outputRange: ['brown', 'black', 'brown'],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={imageIndex}
              style={[styles.normalDots, { width }, { backgroundColor: dotColor }]}
            />
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewStyle: {
    borderRadius: 10,
  },
  scrollContainer: {
    // shadowColor: '#6A6C6E',
    shadowOffset: {
      width: 10,
      height: -10,
    },
    shadowOpacity: 1,
  },
  card: {
    flex: 1,
    marginBottom: 0,
    width: '95%',
    borderRadius: 10,
    overflow: 'hidden',
    resizeMode: 'cover',
    alignSelf: 'center',
    // borderWidth: 4,
    // borderColor: '#9f9f9f',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 5,
  },
  normalDots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  textAreaContainer: {
    width: '100%',
    marginBottom: 1,
  },
  textView: {
    position: 'absolute',
    fontSize: 22,
    fontFamily: 'Avenir',
    fontWeight: '600',
    textAlign: 'center',
    width: '100%',
  },
});
