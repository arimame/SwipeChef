import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Test from './test';
import SwipeCards from './SwipeCards'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewItem: false
    }
  }

  render() {
    if (this.state.viewItem === false) {
      return (
        <View style={{flex:1}}>
          <SwipeCards updateViewItem={this.updateViewItem} />
        </View>
      );
    }
    else {
      return(
        <View style={[styles.container]}>
          <Text >Wow it worked</Text>
          <Button
            onPress={this.updateViewItem}
            title="Back"
            color="black"
          />
        </View>
      )
    }
  }

  updateViewItem = () => {
    this.setState({viewItem: !this.state.viewItem})
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
