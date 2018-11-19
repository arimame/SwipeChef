import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


import Swipe from './screens/Swipe'
import Fridge from './screens/Fridge'
import Details from './screens/Details'
import Book from './screens/Book'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: "swipe",
      previousScreen: null,
      currentRecipe: null,
      currentUser: 2
    }

    updateCurrentScreen = (curScreen, newScreen) => {
      this.setState({currentScreen: newScreen, previousScreen: curScreen})
    }

    updateCurrentRecipe = (newRecipe, curScreen) => {
      this.setState({currentRecipe: newRecipe, currentScreen: "details", previousScreen: curScreen})
    }

    this.trx = {
      updateCurrentScreen: updateCurrentScreen,
      updateCurrentRecipe: updateCurrentRecipe
    }
  }


  // componentDidMount() {
  //   fetch('http://172.46.3.249:3000/recipes/Creamy-Cajun-Chicken-and-Sausage-Pasta-2472083', {
  //     method: "GET",
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json"
  //     }
  //   }).then(results => {
  //  console.log(results._bodyInit)
  //   })
  // }




  render() {
    const stateVars = {
      currentScreen: this.state.currentScreen,
      previousScreen: this.state.previousScreen,
      currentRecipe: this.state.currentRecipe,
      currentUser: this.state.currentUser
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
