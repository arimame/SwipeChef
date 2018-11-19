
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
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
      fetch(`http://172.46.0.254:3000/users/2/fridges/${itemId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
      }).then(results => {
        console.log(results._bodyInit)
        const newFridgeItems = this.state.fridgeItems.filter(function(item) {
          return item.id !== itemId
        });
        this.setState({fridgeItems: newFridgeItems})

      })
    }

    this.trx = props.trx;
    console.log("--------------this trx")
    console.log(this.trx);
    this.trx['removeItem'] = removeItem
    console.log("--------------new trx")
    console.log(this.trx);
  }
  componentDidMount() {
    fetch('http://172.46.0.254:3000/users/2/fridges', {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(results => {
      const parsedResults= JSON.parse(results._bodyInit);
      this.setState({fridgeItems: parsedResults})
    })
  }


  render () {

    const fridgeItemsRender = this.state.fridgeItems ? (<List recipeItems={this.state.fridgeItems} stateVars={this.props.stateVars} trx={this.trx} />) : <Text></Text>

   return (
      <View style={{flex:1}}>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.trx} />
        <View style={{height: heightPercentageToDP('90%')}} >
          <Text>Fridge</Text>
          {fridgeItemsRender}
        </View>
      </View>
    )
  }
}


export default Fridge;