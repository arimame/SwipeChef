import React from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';


import Swipe from './src/screens/Swipe'
import Fridge from './src/screens/Fridge'
import Details from './src/screens/Details'
import Book from './src/screens/Book'
import Setting from './src/screens/Setting'
import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Loading from './src/screens/Loading'
import Friends from './src/screens/Friends'
import GroceryList from './src/screens/GroceryList'

import { Font } from 'expo';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScreen: "loading",
      previousScreen: null,
      currentRecipe: null,
      currentUser: 2,
      fontLoaded: false,
      visitor: false,
      usernameToVisit: "",
      currentList: [],
      portions: 2, 
      webView: false
    }

    updateCurrentScreen = (curScreen, newScreen) => {
      this.setState({currentScreen: newScreen, previousScreen: curScreen})
    }

    updateCurrentRecipe = (newRecipe, curScreen) => {
      this.setState({currentRecipe: newRecipe, currentScreen: "details", previousScreen: curScreen})
    }

    updateCurrentUser = (currentUser) => {
      this.setState({currentUser: currentUser})
    }

    startVisiting = (username) => {
      this.setState({ visitor: true,
                      usernameToVisit: username,
                      currentScreen: 'book',
                      previousScreen: 'friends'})
    }

    endVisiting = () => {
      this.setState({ visitor: false,
                      usernameToVisit: "",
                      currentScreen: 'friends',
                      previousScreen: 'book'})
    }

    addToList = (id) => {
      fetch(`http://172.46.0.254:3000/recipes/${id}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(results => {
        const parsedResults = JSON.parse(results._bodyInit);
        for (const obj of this.state.currentList) {
          if (parsedResults.name === obj.name) {
            return;
          }
        }
        this.setState({currentList: this.state.currentList.concat([
          {
            name: parsedResults.name,
            ingredients: parsedResults.ingredientLines,
            servings: parsedResults.numberOfServings
          }
        ])})
        console.log(this.state.currentList);
      })
    }

    deleteList = () => {
      this.setState({currentList: []})
    }

    updatePortions = (newPortion) => {
      this.setState({portions: newPortion})
    }

    toggleWebView = () => {
      this.setState({webView: !this.state.webView})
    }

    this.trx = {
      updateCurrentScreen: updateCurrentScreen,
      updateCurrentRecipe: updateCurrentRecipe,
      updateCurrentUser: updateCurrentUser,
      startVisiting: startVisiting,
      endVisiting: endVisiting,
      addToList: addToList,
      updatePortions: updatePortions,
      deleteList: deleteList,
      toggleWebView: toggleWebView
    }
  }


  render() {
    const stateVars = {
      currentScreen: this.state.currentScreen,
      previousScreen: this.state.previousScreen,
      currentRecipe: this.state.currentRecipe,
      currentUser: this.state.currentUser,
      fontLoaded: this.state.fontLoaded,
      visitor: this.state.visitor,
      usernameToVisit: this.state.usernameToVisit,
      currentList: this.state.currentList, 
      portions: this.state.portions, 
      webView: this.state.webView
    }

    switch (this.state.currentScreen) {
      case "loading":
        return (
          <View style={{flex:1}}>
            <Loading trx={this.trx} stateVars={stateVars} />
          </View>
          );
        break;
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
      case "setting":
        return (
          <View style={{flex:1}}>
            <Setting trx={this.trx} stateVars={stateVars}/>
          </View>
          );
        break;
        case "login":
          return (
            <View style={{flex:1}}>
              <Login trx={this.trx} stateVars={stateVars}/>
            </View>
          );
        break;
          case "register":
          return (
            <View style={{flex:1}}>
              <Register trx={this.trx} stateVars={stateVars}/>
            </View>
          );
        break;
          case "friends":
          return (
            <View style={{flex:1}}>
              <Friends trx={this.trx} stateVars={stateVars}/>
            </View>
          );
        break;
          case "grocery":
          return (
            <View style={{flex:1}}>
              <GroceryList trx={this.trx} stateVars={stateVars}/>
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



  async componentDidMount() {
    await Font.loadAsync({
    'pacifico-regular': require('./assets/fonts/Pacifico/Pacifico-Regular.ttf'),
    'arimo-regular': require('./assets/fonts/Arimo/Arimo-Regular.ttf'),
    'amaranth-regular': require('./assets/fonts/Amaranth/Amaranth-Regular.ttf'),
    'fredokaone-regular': require('./assets/fonts/Fredoka_One/FredokaOne-Regular.ttf')
  });
    this.setState({ fontLoaded: true });
    AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
      console.log("---------------------------- SWIPE CHEF TOKEN")
      console.log(swipeChefToken)
      console.log("---------------------------- SWIPE CHEF TOKEN")
      if (swipeChefToken) {
        fetch(`http://172.46.0.254:3000/verify_token?swipeChefToken=${swipeChefToken}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(results => {
          console.log(results._bodyInit)
          let parsedResults = JSON.parse(results._bodyInit);
          if (results._bodyInit.includes('400')) {
            this.trx.updateCurrentScreen('loading', 'register')
          } else {
            this.trx.updateCurrentScreen('loading', 'swipe')
          }
        })
      } else {
        this.trx.updateCurrentScreen('loading', 'register')
      }
    })
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
