
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import { list } from 'tcomb';


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
    icon: "book-open-variant",
    newScreen: "book"
  };
  const backButton = {
    icon: "keyboard-backspace",
    newScreen: props.stateVars.previousScreen
  }
  const settingsButton = {
    icon: "settings-outline",
    newScreen: "setting"
  }
  const listButton = {
    icon: "playlist-edit",
    newScreen: "grocery"
  }

  let buttonLeft;
  let buttonRight;
  let title;

  switch (props.stateVars.currentScreen){
    case "swipe":
      buttonLeft = bookButton;
      buttonRight = fridgeButton;
      title = null
      break;
    case "fridge":
      buttonLeft = swipeButton;
      buttonRight = listButton;
      title = "My Fridge"
      break;
    case "book":
      if (props.stateVars.visitor) {
        buttonLeft = backButton;
        buttonRight = null;
        title = props.stateVars.usernameToVisit;
      } else {
        buttonLeft = settingsButton;
        buttonRight = swipeButton;
        title = "My Cookbook";
      }
      break;
    case "details":
      buttonLeft = backButton;
      buttonRight = null;
      title = null;
      break;
    case "setting":
      buttonLeft = null;
      buttonRight = bookButton;
      title = "Settings";
      break;
    case "register":
      buttonLeft = null;
      buttonRight = null;
      title = null;
      break;
    case "login":
      buttonLeft = null;
      buttonRight = null;
      title = null;
      break;
    case "friends":
      buttonLeft = backButton;
      buttonRight = null;
      title = "My Fav Chefs";
      break;
    case "grocery":
      buttonLeft = fridgeButton;
      buttonRight = null;
      title = "My Grocery List"
      break;
    default:
      console.log("error!!!! the button is wrong");
      break;
  }

  leftButtonPress = (e) => {

    if (props.stateVars.webView) {
      props.trx.toggleWebView()
    } else {

      props.trx.updateCurrentScreen(props.stateVars.currentScreen, buttonLeft.newScreen)
      if (props.stateVars.visitor) {
        props.trx.endVisiting()
      }
    }
  }

  rightButtonPress = (e) => {
    props.trx.updateCurrentScreen(props.stateVars.currentScreen, buttonRight.newScreen)
  }

  const buttonLeftRender = buttonLeft ?  (<Icon name = {buttonLeft.icon} style={{textAlign: "center", fontSize: 40, color: "#F3C05F"}} onPress={leftButtonPress}/>) : <Text></Text>
  const buttonRightRender = buttonRight ?  (<Icon name = {buttonRight.icon} style={{textAlign: "center", fontSize: 40, color: "#F3C05F"}} onPress={rightButtonPress}/>) : <Text></Text>
  const setTitle = title ? (<Text style={{textAlign: "center"}}><Text style={{fontSize: 30, color: "#E9E2BB", fontFamily: "pacifico-regular"}}>{title}</Text></Text>) : <Text style={{textAlign: "center"}}><Text style={{fontSize: 30, color: "#E9E2BB", fontFamily: "pacifico-regular"}}>Swipe</Text><Text style={{fontSize: 30, color: "#F3C05F", fontFamily: "arimo-regular"}}>Chef</Text></Text>
  return (
    <View style={{flexDirection: 'row', paddingTop: 35, paddingBottom: 15, backgroundColor: "#0F2F47", justifyContent: "center"}}>
      <View style={{width: widthPercentageToDP('15%'),  paddingTop: 8, paddingLeft: 20}}>
      {buttonLeftRender}
      </View>
      <View style={{width: widthPercentageToDP('70%')}}>
        {props.stateVars.fontLoaded ? setTitle : null }
      </View>
      <View style={{width: widthPercentageToDP('15%'), paddingTop: 8, paddingRightt: 20}}>
        {buttonRightRender}
      </View>
    </View>
  )
}


export default Navbar;