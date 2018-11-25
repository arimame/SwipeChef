import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight, AsyncStorage, ActivityIndicator} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import t from 'tcomb-form-native'
import Navbar from "../partials/Navbar";
import GroceryListItem from "../partials/GroceryListItem"


class GroceryList extends React.Component {
  constructor(props) {
    super(props);
  }

  

  render () {

    const items = this.props.stateVars.currentList.map((recipe) => 
      <GroceryListItem stateVars={this.props.stateVars} trx={this.props.trx} recipe={recipe} />
    )

    return (
      <View>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
        {items}
      </View>
    )
  }
}

export default GroceryList;