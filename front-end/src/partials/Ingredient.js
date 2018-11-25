import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight, AsyncStorage, ActivityIndicator} from 'react-native';
import {CheckBox} from 'react-native-elements'
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import t from 'tcomb-form-native'
import Navbar from "../partials/Navbar";

const Fraction = require('fraction.js')


class Ingredient extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  render () {

    const multiplier = this.props.stateVars.portions / this.props.recipe.servings

    const number = this.props.ingredient.match(/\d+([\/.]\d+)?/g)

    const multipliedNum = number ? eval(number[0]) * multiplier : ""

    const fraction = multipliedNum ? (new Fraction(multipliedNum)).toFraction(true) : ""

    const text = this.props.ingredient.replace(number, "");

    const displayedValue = fraction + text

    console.log("FRACTION", fraction, "TEXT", text)

    return (
      <CheckBox
        size={20}
        title={displayedValue}
        checked={this.state.checked}
        onPress={() => this.setState({checked: !this.state.checked})}
      />
    )
  }
}

export default Ingredient;