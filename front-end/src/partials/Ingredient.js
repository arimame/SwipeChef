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
    // console.log("TEST", eval("1 1/2"));

    const multiplier = this.props.stateVars.portions / this.props.recipe.servings

    //const number = this.props.ingredient.match(/\d+([\/.]\d+)?/g)
    const number = this.props.ingredient.match(/\d+(?:(?: \d+)*\/\d+)?/g)
    console.log("NUMBER:", number)

    // const multipliedNum = number ? eval(number[0]) * multiplier : ""

    let multipliedNum;
    if (number && number[0].indexOf(' ') >= 0) {
      console.log("IM IN HERE");
      const step = number[0].match(/\d+([\/.]\d+)?/g);
      multipliedNum = (eval(step[0]) + eval(step[1])) * multiplier
    } else if (number) {
      multipliedNum =  eval(number[0]) * multiplier;
    } else {
      multipliedNum = ""
    }

    const fraction = multipliedNum ? (new Fraction(multipliedNum)).toFraction(true) : ""

    const text = number ? this.props.ingredient.replace(number[0], "") : this.props.ingredient;

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