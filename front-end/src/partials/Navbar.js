
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';


function Navbar (props) {
console.log("------------------")
console.log(props.stateVars.currentScreen);

  const fridgeButton = {
    icon: "fridge",
    newScreen: "fridge"
  };
  const swipeButton = {
    icon: "silverware-fork-knife",
    newScreen: "swipe"
  };
  const bookButton = {
    icon: "notebook",
    newScreen: "book"
  };
  const backButton = {
    icon: "keyboard-backspace",
    newScreen: props.stateVars.previousScreen
  }

  let buttonLeft;
  let buttonRight;
  let title;

  switch (props.stateVars.currentScreen){
    case "swipe":
      buttonLeft = bookButton;
      buttonRight = fridgeButton;
      title = "SwipeChef"
      break;
    case "fridge":
      buttonLeft = swipeButton;
      buttonRight = null;
      title = "My Fridge"
      break;
    case "book":
      buttonLeft = null;
      buttonRight = swipeButton;
      title = "My Coookbook"
      break
    case "details":
      buttonLeft = backButton;
      buttonRight = null;
      title = "SwipeChef"
      break
    default:
      console.log("error!!!! the button is wrong");
      break;
  }

  leftButtonPress = (e) => {
    props.trx.updateCurrentScreen(props.stateVars.currentScreen, buttonLeft.newScreen)
  }

  rightButtonPress = (e) => {
    props.trx.updateCurrentScreen(props.stateVars.currentScreen, buttonRight.newScreen)
  }

  const buttonLeftRender = buttonLeft ?  (<Icon name = {buttonLeft.icon} style={{textAlign: "center", fontSize: 40}} onPress={leftButtonPress}/>) : <Text></Text>
  const buttonRightRender = buttonRight ?  (<Icon name = {buttonRight.icon} style={{textAlign: "center", fontSize: 40}} onPress={rightButtonPress}/>) : <Text></Text>

  return (
    <View style={{flexDirection: 'row', paddingTop: 35, paddingBottom: 15, backgroundColor: "purple", justifyContent: "center"}}>
      <View style={{width: widthPercentageToDP('15%')}}>
      {buttonLeftRender}
      </View>
      <View style={{width: widthPercentageToDP('70%')}}>
        <Text style={{textAlign: "center", fontSize: 30}}>
          {title}
        </Text>
      </View>
      <View style={{width: widthPercentageToDP('15%')}}>
        {buttonRightRender}
      </View>
    </View>
  )
}


export default Navbar;