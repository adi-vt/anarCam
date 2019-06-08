import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomCamera from '../components/customCamera';

export default class Home extends Component {
  moveToNextScreen = () => {
    const { navigation } = this.props;
    navigation.navigate('ProductUpload');
  };
  render() {
    return (
      <View style={styles.container}>
        <CustomCamera moveToNextScreen={this.moveToNextScreen} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
