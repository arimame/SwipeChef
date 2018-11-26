import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight, AsyncStorage, ActivityIndicator} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import t from 'tcomb-form-native'
import Navbar from "../partials/Navbar";
import Ingredient from "../partials/Ingredient"


function GroceryListItem(props) {

  const ingredients = props.recipe.ingredients.map((ingredient, index) =>
    <Ingredient stateVars={props.stateVars} trx={props.trx} ingredient={ingredient} recipe={props.recipe} key={index}/>
  )

  return (
    <View>
      <View style={styles.list_info_container}>
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.recipe_name}>{props.recipe.name}</Text>
      </View>
      {ingredients}
    </View>
  )
}

export default GroceryListItem;

const styles = StyleSheet.create({

  list_info_container: {
    margin: 10,
    borderColor: '#0F2F47',
    borderWidth: 2,
    borderRadius: 5,
  },
  recipe_name: {
    textAlign: 'center',
    fontFamily: "pacifico-regular",
    color: '#0F2F47',
    lineHeight: 50,
    backgroundColor: '#F3C05F',
  }
})