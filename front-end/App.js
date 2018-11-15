import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Test from './test';
import SwipeCards from './SwipeCards'

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <SwipeCards />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
