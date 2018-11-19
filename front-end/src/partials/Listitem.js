import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, TouchableHighlight} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en'



function Listitem (props) {

  console.log("------------------Listitem view")
  const msNow = Date.now();
  const msDiff = msNow - Date.parse(props.recipe.created_at);
  const expireDays = Math.floor((864000000 - msDiff) / 86400000);

  console.log("-------BUTTON--------", props.recipe)


  deleteButtonPress = (e) => {
    props.trx.removeItem(props.recipe.id)
  }

  detailsButtonPress = (e) => {
    props.trx.updateCurrentRecipe(props.recipe.api_ref, props.stateVars.currentScreen)
  }

    return (
      <View style={{flexDirection: 'row', borderColor: "black", borderWidth: 0.5 , justifyContent: "center", marginBottom: 10}}>
        <View style={{width: widthPercentageToDP('25%'), height: heightPercentageToDP('12%'), borderColor: "black", borderWidth: 0.5}}>
        <TouchableHighlight onPress={this.detailsButtonPress}>
          <Image
            source={{uri: props.recipe.image}}
            style= {{width:90, height: 90}}
          />
        </TouchableHighlight>
        </View>
        <View style={{width: widthPercentageToDP('70%'), flexDirection: 'column', borderColor: "black", borderWidth: 0.5}}>
          <View style={{height: heightPercentageToDP('4%'), borderColor: "black", borderWidth: 0.5}} >
            <Text>{props.recipe.name}</Text>
          </View>
          <View style={{height: heightPercentageToDP('2%'), borderColor: "black", borderWidth: 0.5}}>
            <Text>Expires in: {expireDays} days</Text>
          </View>
          <View style={{height: heightPercentageToDP('6%'), borderColor: "black", borderWidth: 0.5, flexDirection: 'row'}}>
            <View style={{width: widthPercentageToDP('23.33'), borderColor: "black", borderWidth: 0.5}}><Text onPress={deleteButtonPress}>Delete</Text></View>
            <View style={{width: widthPercentageToDP('23.33%'), borderColor: "black", borderWidth: 0.5}}></View>
            <View style={{width: widthPercentageToDP('23.34%'), borderColor: "black", borderWidth: 0.5}}></View>

          </View>
        </View>
      </View>
    )
}


export default Listitem;