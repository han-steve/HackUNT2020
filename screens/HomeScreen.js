import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#F53844', '#42378F']}
        style={styles.background}
      >
        <Text style={styles.title}>Check In</Text>
        <ScrollView>

        </ScrollView>
      </LinearGradient>

    </View >
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontSize: 40,
    color: 'white',
    fontWeight: '800'
  },
  background: {
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 70
  }
});
