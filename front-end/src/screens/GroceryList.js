import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight, AsyncStorage, ActivityIndicator, ScrollView} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import t from 'tcomb-form-native'
import Navbar from "../partials/Navbar";
import GroceryListItem from "../partials/GroceryListItem";
import NumericInput from "react-native-numeric-input";


class GroceryList extends React.Component {
  constructor(props) {
    super(props);
  }

  plusMinusOnPress = (e) => {
    this.props.trx.updatePortions(e)
  }

  render () {

    const items = this.props.stateVars.currentList.map((recipe) => 
      <GroceryListItem stateVars={this.props.stateVars} trx={this.props.trx} recipe={recipe} />
    )

    const display = this.props.stateVars.currentList.length > 0 ? (
      <ScrollView>
        <View style={{flexDirection: 'row', marginTop:20, marginBottom:10}}>
          <View style={{width: widthPercentageToDP('50%'), justifyContent:"center", alignContent:"center", marginLeft: 10}}>
            <Text style={{textAlign: "center", fontSize:24, fontFamily: "pacifico-regular", color: '#0F2F47'}}>Portions: </Text>
          </View>
          <View style={{width: widthPercentageToDP('50%')}}>
            <NumericInput 
              type='up-down' 
              onChange={this.plusMinusOnPress}
              iconStyle={{color: "#E9E2BB"}}
              upDownButtonsBackgroundColor='#E88532'
              rounded
              minValue={1}
              initValue={this.props.stateVars.portions}
            />
          </View>
        </View>
        {items}
        <View style={{height:175, marginTop:20}}>
          <Button
            onPress={this.props.trx.deleteList}
            title="Delete Grocery List"
            color='#C53A32'
          />
        </View>
      </ScrollView>
    ) : (
      <View style={{justifyContent:"center", alignContent:"center", height: heightPercentageToDP('70%')}}>
        <Text style={{margin: 20, fontSize: 22, textAlign: 'center'}}>Your grocery list is empty!</Text>
        <Text style={{margin: 20, fontSize: 22, textAlign: 'center'}}>Add some new recipes from your fridge, or some old favourites from your cookbook!</Text>
      </View>
    )

    return (
      <View>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
        {display}
      </View>
    )
  }
}

export default GroceryList;