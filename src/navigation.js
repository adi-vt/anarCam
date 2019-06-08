import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Home from './screens/home';
import ProductUpload from './screens/productUpload';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      header: null
    })
  },
  ProductUpload
});

export default createAppContainer(AppNavigator);
