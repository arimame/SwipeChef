
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';


import SwipeCards from "../partials/SwipeCards";
import Navbar from "../partials/Navbar";
import List from "../partials/List";

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookItems: null
    }

    removeItem = (itemId) => {
      fetch(`http://172.46.0.254:3000/users/2/books/${itemId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
      }).then(results => {
        console.log(results._bodyInit)
        const newBookItems = this.state.bookItems.filter(function(item) {
          return item.id !== itemId
        });
        this.setState({bookItems: newBookItems})
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
    fetch('http://172.46.0.254:3000/users/2/books', {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(results => {
      const parsedResults= JSON.parse(results._bodyInit);
      this.setState({bookItems: parsedResults})
    })
  }
  render () {

    const bookItemsRender = this.state.bookItems ? (<List recipeItems={this.state.bookItems} stateVars={this.props.stateVars} trx={this.trx} />) : <Text></Text>

    return (
      <View style={{flex:1}}>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.trx} />
        <View style={{height: heightPercentageToDP('90%')}} >
          <Text>book</Text>
          {bookItemsRender}
        </View>
      </View>
    )
  }
}


export default Book;