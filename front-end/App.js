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

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScreen: "loading",
      previousScreen: null,
      currentRecipe: null,
      currentUser: 2,
      visitor: false,
      usernameToVisit: ""
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

    this.trx = {
      updateCurrentScreen: updateCurrentScreen,
      updateCurrentRecipe: updateCurrentRecipe,
      updateCurrentUser: updateCurrentUser,
      startVisiting: startVisiting,
      endVisiting: endVisiting
    }
  }


  render() {
    const stateVars = {
      currentScreen: this.state.currentScreen,
      previousScreen: this.state.previousScreen,
      currentRecipe: this.state.currentRecipe,
      currentUser: this.state.currentUser,
      visitor: this.state.visitor,
      usernameToVisit: this.state.usernameToVisit
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
  componentDidMount() {
    AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
      console.log("---------------------------- SWIPE CHEF TOKEN")
      console.log(swipeChefToken)
      console.log("---------------------------- SWIPE CHEF TOKEN")
      if (swipeChefToken) {
        fetch(`http://172.46.3.249:3000/verify_token?swipeChefToken=${swipeChefToken}`, {
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
