import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';



import Listitem from "../partials/Listitem";

function List (props) {

console.log("------------------List view")
console.log(props.recipeItems)


const listElements = props.recipeItems.map((recipe) =>
  <Listitem recipe={recipe} trx={props.trx} stateVars={props.stateVars} />
)


  return (
    <View style={{flex:1, marginTop: 10}}>
    {listElements}
    </View>
  )
}


export default List;