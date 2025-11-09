import React from 'react';
import { StyleSheet, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { COLORS } from '../theme/theme'; // adjust path to your theme file

const RenderHTML = ({ html, textColor = COLORS.dark, linkColor = COLORS.blue }) => {
  if (!html || html.trim() === '') {
    return null;
  }

  return (
    <View style={styles.container}>
      <HTMLView
        value={html}
        stylesheet={{
          p: { color: textColor, fontFamily: 'Hind-Regular', fontSize: 14, lineHeight: 20 },
          b: { fontFamily: 'Hind-Bold' },
          i: { fontStyle: 'italic' },
          a: { color: linkColor, textDecorationLine: 'underline' },
          h1: { fontSize: 20, fontFamily: 'Hind-Bold', marginBottom: 6 },
          h2: { fontSize: 18, fontFamily: 'Hind-Bold', marginBottom: 4 },
          img: { width: '100%', height: 200, resizeMode: 'contain', marginVertical: 10 },
        }}
      />
    </View>
  );
};

export default RenderHTML;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
