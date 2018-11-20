
import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Button} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';


import SwipeCards from "../partials/SwipeCards";
import Navbar from "../partials/Navbar";
import List from "../partials/List";
import Userinfo from "../partials/UserInfo";

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookItems: null,
      userImage: null,
      userTagline: null,
      userName: null
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
      const parsedResults = JSON.parse(results._bodyInit);
      this.setState({bookItems: parsedResults})
    }).then(results => {
      fetch('http://172.46.0.254:3000/users/2', {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then (results => {
        const userInfoParsed = JSON.parse(results._bodyInit);
        this.setState({
          userImage: userInfoParsed.photo,
          userTagline: userInfoParsed.tagline,
          userName: userInfoParsed.username
        })

      })
    })


  }
  render () {

    const userVars = {
      userImage: this.state.userImage,
      userTagline: this.state.userTagline,
      username: this.state.username
    }

    const bookItemsRender = this.state.bookItems ? (<List recipeItems={this.state.bookItems} stateVars={this.props.stateVars} trx={this.trx} />) : <Text></Text>

    return (
      <View style={{flex:1}}>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.trx} />
        <ScrollView>
          <View style={{flex:1}}>
            <Userinfo stateVars={this.props.stateVars}  trx={this.trx} userVars={userVars}/>
          </View>
          <Text>book</Text>
          {bookItemsRender}
        </ScrollView>
      </View>
    )
  }
}


export default Book;