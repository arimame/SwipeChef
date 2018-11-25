import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight, AsyncStorage, ActivityIndicator} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import t from 'tcomb-form-native'
import Navbar from "../partials/Navbar";
import Ingredient from "../partials/Ingredient"


function GroceryListItem(props) {

  const ingredients = props.recipe.ingredients.map((ingredient) =>
    <Ingredient stateVars={props.stateVars} trx={props.trx} ingredient={ingredient} recipe={props.recipe} />
  )

  return (
    <View>
      <Text>{props.recipe.name}</Text>
      {ingredients}
    </View>
  )
}

export default GroceryListItem;