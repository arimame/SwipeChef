import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


import Swipe from './screens/Swipe'
import Fridge from './screens/Fridge'
import Detials from './screens/Details'
import Book from './screens/Book'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "swipe"
    }

    updateCurrentScreen = (newScreen) => {
      this.setState({currentScreen: newScreen})
    }

    this.trx = {
      updateCurrentScreen: updateCurrentScreen
    }
  }

  render() {
    const stateVars = {
      currentScreen: this.state.currentScreen
    }

    switch (this.state.currentScreen) {
      case "swipe":
        return (
          <View style={{flex:1}}>
            <Swipe trx={this.trx} stateVars={stateVars} />
          </View>
          );
        break;
      case "details":
        return (
          <View style={{flex:1}}>
            <Details trx={this.trx} stateVars={stateVars} />
          </View>
          );
        break;
      case "fridge":
        return (
          <View style={{flex:1}}>
            <Fridge trx={this.trx} stateVars={stateVars} />
          </View>
          );
        break;
      case "book":
        return (
          <View style={{flex:1}}>
            <Book trx={this.trx} stateVars={stateVars}/>
          </View>
          );
        break;
      default:
        console.log("error!!: invalid screen variable for currentScreen");
        break;
    }
    // old view
    // if (this.state.viewItem === false) {
    //   return (
    //     <View style={{flex:1}}>
    //       <SwipeCards updateViewItem={this.updateViewItem} />
    //     </View>
    //   );
    // }
    // else {
    //   return(
    //     <View style={[styles.container]}>
    //       <Text >Wow it worked</Text>
    //       <Button
    //         onPress={this.updateViewItem}
    //         title="Back"
    //         color="black"
    //       />
    //     </View>
    //   )
    // }
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
