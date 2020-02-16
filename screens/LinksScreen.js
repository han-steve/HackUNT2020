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
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      photo: null,
      photoId: '',
      openCamera: false,
      imageSource: '',
      message: '',
      base64: '',
      score: 20
    };

  }

  cameraRef = React.createRef();
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async () => {
    let data = await this.cameraRef.current.takePictureAsync({ skipProcessing: true, base64: true });
    this.setState({
      //takeImageText: "PICTURE TAKEN",
      photo: data.uri,
      openCamera: false,
      imageSource: data.uri,
      base64: data.base64
    });
    let response = await this.makeRequest(this.state.base64); // api call
    if (response.displayName === "NotEmpty") {
      this.setState(previousState => ({
        message: "Congratulations, you are all set for the flight!",
        score: previousState.score + 20
      }))
    } else {
      this.setState({
        message: "Sorry, please try again."
      });
      setTimeout(() => {
        this.setState({
          message: '',
          openCamera: true
        });
      }, 2000)
    }
  }

  makeRequest = async (base64) => {
    return fetch("http://16dfc648.ngrok.io", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base64: this.state.base64
      })
    }).then((response) => response.json());
  }

  openCamera = () => {
    this.setState({ openCamera: true });
  }

  closeCamera = () => {
    this.setState({ openCamera: false });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <LinearGradient
            colors={['#F53844', '#42378F']}
            style={styles.background}
          >
            <View style={styles.top}>
              <Text style={styles.title}>In Flight</Text>
              <Text style={styles.number}>{this.state.score}</Text>
            </View>

            {!this.state.message ?
              <View style={{ flex: 1 }}>
                {!this.state.openCamera && (
                  <Text style={styles.text}>Take picture of your personal item placed under your seat to earn 20 points.</Text>
                )}
                {!this.state.openCamera &&
                  <TouchableOpacity onPress={this.openCamera}>
                    <View style={styles.openCameraBtn}>
                      <Text style={styles.openCameraText}>Take a Picture</Text>
                    </View>
                  </TouchableOpacity>
                }
                {this.state.openCamera &&
                  <Camera style={{ flex: 1, borderRadius: 50, marginBottom: 20 }} ref={this.cameraRef}>
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'column',
                      }}>
                      <TouchableOpacity
                        onPress={this.takePicture} style={styles.camera}>
                        <View style={styles.captureBtn}></View>
                      </TouchableOpacity>
                    </View>
                  </Camera>
                }
                {!this.state.openCamera &&
                  <Image source={{ uri: this.state.imageSource }} style={styles.image} />
                }
              </View>
              :
              <Text style={styles.text}>{this.state.message}</Text>
            }
          </LinearGradient>

        </View >
      )
    }
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
