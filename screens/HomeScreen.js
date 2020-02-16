import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { MonoText } from '../components/StyledText';

const data = [
  {
    name: 'Backpack',
    x: 18,
    y: 14,
    z: 8,
    message: 'Please put this item under your seat'
  },
  {
    name: 'suitcase',
    x: 22,
    y: 14,
    z: 9,
    message: 'Please put this item on the overhead bin'
  },
  {
    name: 'luggage',
    x: 24,
    y: 15,
    z: 10,
    message: 'Too big for carry-on. Please check this bag. '
  }

]

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#F53844', '#42378F']}
        style={styles.background}
      >
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={styles.title}>Check In</Text>
            <Text style={styles.text}>My items:</Text>
          </View>
          <View>
            <Image source={require('../assets/images/logo.png')} style={{ width: 50, height: 50 }} />
          </View>
        </View>
        <ScrollView>
          {data.map((value, index) => {
            return (
              <View style={styles.card} key={index}>
                <View style={styles.cardLeft}>
                  <Text style={styles.cardName}>
                    {value.name}
                  </Text>
                  <Text style={styles.cardDimension}>
                    {value.x} x {value.y} x {value.z} inches
                  </Text>
                  <Text style={styles.cardMessage}>
                    {value.message}
                  </Text>
                </View>
                <View style={styles.cardRight}>
                </View>

              </View>
            )
          })}

        </ScrollView>
      </LinearGradient>

    </View >
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    color: 'white',
    fontWeight: '800'
  },
  background: {
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 70
  },
  text: {
    fontSize: 28,
    color: '#EEEEEE',
    fontWeight: '800'
  },
  card: {
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 10
  },
  cardName: {
    fontWeight: '800',
    fontSize: 30,
    color: '#313131'
  },
  cardDimension: {
    fontWeight: '900',
    fontSize: 20,
    color: '#B7B7B7'
  },
  cardMessage: {
    fontSize: 20,
    color: '#313131',
    marginTop: 10
  }
});
