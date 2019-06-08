import React, { Component } from 'react';
import { Text, View } from 'react-native';
import AppNavigator from './navigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <AppNavigator />;
  }
}
