
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';


import SwipeCards from "../partials/SwipeCards";
import Navbar from "../partials/Navbar";

function Book (props) {

console.log("------------------book view")
console.log(props.stateVars.currentScreen);

  return (
    <View style={{flex:1}}>
      <Navbar stateVars={props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={props.trx} />
      <View style={{height: heightPercentageToDP('90%')}} >
        <Text>book</Text>
      </View>
    </View>
  )
}


export default Book;