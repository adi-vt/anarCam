import React, { Component } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MyListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }

  _onPress = () => {
    this.setState(
      prevState => {
        return {
          selected: !prevState.selected
        };
      },
      () => {
        this.props.onPressItem(this.props.item.uri, this.state.selected);
      }
    );
  };

  render() {
    const { selected } = this.state;

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={selected ? { opacity: 0.8 } : {}}>
          <Image
            source={{ uri: this.props.item.uri }}
            style={[
              styles.image,
              { borderColor: selected ? '#ec6e76' : 'white' }
            ]}
          />
        </View>
        <View style={styles.centeredTextContainer}>
          <Text>
            {selected ? (
              <Icon name='ios-checkmark' size={50} color='white' />
            ) : null}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 55,
    marginTop: 58,
    margin: 6,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white'
  },
  centeredTextContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
