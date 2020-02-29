import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      competitors: [{ name: "Andrew", score: 30 }, { name: "Gordon", score: 50 }, { name: "John", score: 40 }, { name: "Josh", score: 10 }, { name: "Spencer", score: 40 }],
      score: 20
    };

  }

  update = () => {
    this.state.competitors.push({ name: "You", score: this.state.score });
    this.state.competitors.sort((a, b) => b > a ? 1 : -1);
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={['#F53844', '#42378F']}
          style={styles.background}
        >
          <View style={styles.top}>
            <Text style={styles.title}>Leaderboard</Text>
            {/* <Text style={styles.number}>{this.state.score}</Text> */}
            <ScrollView>
              {this.state.competitors.map(function (competitor) {
                <View class="competitor">
                  <Text>{competitor.name}</Text>
                  <Text>{competitor.score}</Text>
                </View>
              })}
              }
            </ScrollView>
          </View>

        </LinearGradient>

      </View >
    )
  }
}

const styles = StyleSheet.create({
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontSize: 40,
    color: 'white',
    fontWeight: '800',
    marginBottom: 30
  },
  number: {
    fontSize: 20,
    fontSize: 40,
    color: 'white',
    fontWeight: '900',
    marginBottom: 30,
    fontStyle: 'italic'
  },
  background: {
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 70,
  },
  camera: {
    display: 'flex',
    alignSelf: 'center',
    marginTop: 500
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF",
  },
  openCameraBtn: {
    width: 300,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 60,
    display: 'flex',
    justifyContent: 'center'
  },
  openCameraText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#F53844',
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 50
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 20
  }
});
