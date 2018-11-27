
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, AsyncStorage} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';


import SwipeCards from "../partials/SwipeCards";
import Navbar from "../partials/Navbar";
import List from "../partials/List";

class Fridge extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      fridgeItems: null
    }

    removeItem = (itemId) => {

      AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        fetch(`http://192.168.0.20:3000/fridges/${itemId}?swipeChefToken=${swipeChefToken}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
        }).then(results => {
          const parsedResults = JSON.parse(results._bodyInit)

          if (parsedResults === "register") {
            this.props.trx.updateCurrentScreen("fridge", "register")

          } else {
            const newFridgeItems = this.state.fridgeItems.filter(function(item) {
              return item.id !== itemId
            });
            this.setState({fridgeItems: newFridgeItems})
          }
        })
      })
    }

    addToBook = (itemId) => {
      AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        fetch(`http://192.168.0.20:3000/books?swipeChefToken=${swipeChefToken}`, {
          method: 'POST',
          headers:
            {"Accept": "application/json",
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `recipe_id=${itemId}` // <-- Post parameters
        })
      })
    }

    this.trx = props.trx;
    console.log("--------------this trx")
    console.log(this.trx);
    this.trx['removeItem'] = removeItem
    this.trx['addToBook'] = addToBook
    console.log("--------------new trx")
    console.log(this.trx);
  }
  componentDidMount() {
    AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
      fetch(`http://192.168.0.20:3000/fridges?swipeChefToken=${swipeChefToken}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(results => {
        const parsedResults= JSON.parse(results._bodyInit)
        this.setState({fridgeItems: parsedResults})
      })
    })
  }


  render () {

    const fridgeItemsRender = this.state.fridgeItems ? (<List recipeItems={this.state.fridgeItems} stateVars={this.props.stateVars} trx={this.trx} />) : <Text></Text>

   return (
      <View style={styles.container}>
        <Navbar stateVars={this.props.stateVars} style={styles.navbar} trx={this.trx} />
        <View style={styles.recipeContainer} >
          {fridgeItemsRender}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navbar: {
    height: heightPercentageToDP('10%'),
  },
  recipeContainer: {
    height: heightPercentageToDP('90%')
  }
});


export default Fridge;