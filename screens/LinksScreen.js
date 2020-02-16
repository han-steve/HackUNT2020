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
      imageSource: ''
    };

  }

  cameraRef = React.createRef();
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePicture = async () => {
    this.cameraRef.current.takePictureAsync({ skipProcessing: true }).then((data) => {
      this.setState({
        //takeImageText: "PICTURE TAKEN",
        photo: data.uri,
        openCamera: false,
        imageSource: data.uri
      });
    })
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
            <Text style={styles.title}>In Flight</Text>
            <TouchableOpacity onPress={this.openCamera}>
              <View style={styles.openCameraBtn}>
                <Text>Take a Picture</Text>
              </View>
            </TouchableOpacity>
            {this.state.openCamera &&
              <Camera style={{ flex: 1 }} ref={this.cameraRef}>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    onPress={this.takePicture}>
                    <View style={styles.captureBtn}></View>
                  </TouchableOpacity>
                </View>
              </Camera>
            }
            {!this.state.openCamera &&
              <Image source={{ uri: this.state.imageSource }} style={{ width: 200, height: 200 }} />
            }
          </LinearGradient>

        </View >
      )
    }
  }
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
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF",
  },
  openCameraBtn: {
    width: 200,
    height: 60,
    backgroundColor: 'white'
  }
});
