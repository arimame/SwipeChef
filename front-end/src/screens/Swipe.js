
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';


import SwipeCards from "../partials/SwipeCards";
import Navbar from "../partials/Navbar";

function Swipe (props) {

  return (
    <View style={{flex:1}}>
      <Navbar stateVars={props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={props.trx} />
      <SwipeCards trx={props.trx} style={{height: heightPercentageToDP('90%')}}/>
    </View>
  )
}


export default Swipe;