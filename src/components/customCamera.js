import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  CameraRoll
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import GalleryCarousel from './galleryCarousel';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraPermissions: false,
      photos: null,
      cameraFlash: false,
      galleryImages: []
    };
  }

  async componentDidMount() {
    await this.requestPermission();
    this.setupMiniGallery();
  }

  setupMiniGallery = () => {
    CameraRoll.getPhotos({
      first: 1000000,
      assetType: 'Photos'
    })
      .then(response => {
        function compare(a, b) {
          if (a.node.timestamp < b.node.timestamp) {
            return -1;
          }
          if (a.node.timestamp > b.node.timestamp) {
            return 1;
          }
          return 0;
        }
        response.edges.sort(compare); // sort response to get latest photos

        var photos = response.edges.map(asset => {
          return asset.node.image;
        });

        this.setState({ galleryImages: photos });
      })
      .catch(err => console.log(err));
  };

  requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA
      ]);

      if (
        granted['android.permission.CAMERA'] === 'granted' &&
        granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
      ) {
        this.setState({ cameraPermissions: true });
      } else {
        console.log('permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, fixOrientation: true };
      const data = await this.camera.takePictureAsync(options);
      await CameraRoll.saveToCameraRoll(data.uri);
      this.setupMiniGallery(); // reload mini gallery to reflect new photo
    }
  };

  toggleFlash = () => {
    this.setState(prevState => {
      return { cameraFlash: !prevState.cameraFlash };
    });
  };

  getRNCam = () => (
    <RNCamera
      ref={ref => (this.camera = ref)}
      style={styles.preview}
      captureAudio={false}
      type={RNCamera.Constants.Type.back}
      flashMode={
        this.state.cameraFlash
          ? RNCamera.Constants.FlashMode.on
          : RNCamera.Constants.FlashMode.off
      }
    >
      <GalleryCarousel
        data={this.state.galleryImages}
        moveToNextScreen={this.props.moveToNextScreen}
      />
      <View style={styles.controlsParentContainer}>
        <TouchableOpacity
          onPress={this.toggleFlash}
          style={styles.camOptionIconContainer}
        >
          <Text>
            <Icon
              name={this.state.cameraFlash ? 'ios-flash' : 'ios-flash-off'}
              size={30}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
          <View style={styles.innerCapture} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.takePicture}
          style={styles.camOptionIconContainer}
        >
          <Text>
            <Icon name='ios-reverse-camera' size={30} />
          </Text>
        </TouchableOpacity>
      </View>
    </RNCamera>
  );

  render = () => <>{this.state.cameraPermissions && this.getRNCam()}</>;
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  controlsParentContainer: {
    flex: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  capture: {
    flex: 0,
    height: 80,
    width: 80,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
    borderWidth: 1,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: 'transparent',
    alignSelf: 'center'
  },
  innerCapture: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'white'
  },
  camOptionIconContainer: {
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    alignSelf: 'center'
  }
});
