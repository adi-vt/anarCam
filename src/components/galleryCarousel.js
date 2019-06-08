import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import ListItem from './listItem';
import Icon from 'react-native-vector-icons/Ionicons';

export default class galleryCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUris: []
    };
  }
  _keyExtractor = (item, index) => index.toString();
  _onPressItem = (uri, selectedState) => {
    this.setState(prevState => {
      let { selectedUris } = prevState;
      if (selectedState) {
        selectedUris.push(uri);
      } else {
        var index = selectedUris.indexOf(uri);
        if (index > -1) selectedUris.splice(index, 1);
      }
      return { selectedUris };
    });
  };

  _renderItem = ({ item }) => {
    return <ListItem onPressItem={this._onPressItem} item={item} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.props.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
        <TouchableOpacity
          style={styles.confirmBtnContainer}
          onPress={this.props.moveToNextScreen}
        >
          <Icon name={'ios-checkmark'} size={65} color='white' />
          <Text style={styles.selectedCountTxt}>
            {this.state.selectedUris.length}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '100%'
  },
  confirmBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    borderRadius: 35,
    right: 38,
    backgroundColor: '#ec6e76',
    position: 'absolute'
  },
  selectedCountTxt: {
    position: 'absolute',
    right: 18,
    top: 40,
    fontSize: 12,
    color: 'white'
  }
});
