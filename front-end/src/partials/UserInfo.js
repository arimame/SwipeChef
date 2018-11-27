import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';

import ImagePickerComponent from "../partials/ImagePicker";



function Userinfo (props) {
  console.log("------------------------ Userimage USERINFO RENDER")
  console.log(props.userVars.userImage)

  let randNum = Math.round(Math.random() * 50,0)

  imageName = `http://172.46.0.254:3000/${props.userVars.userImage}?spaghetti=${randNum}`


  const userImage = props.userVars.userImage && props.userVars.userImage.includes("gstatic") ? <Image source={{uri:`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmGRbg0zgj_aGlIjzN0t8bA6RCJjP5Puc3jxyltW2n0kg86cerug`}} style= {{width: 300, height: 300, borderRadius: 5, marginTop: -25, zIndex:-1}} /> : <Image key={imageName} source={{uri: imageName}} style= {{width: 300, height: 300, borderRadius: 5, marginTop: -25, zIndex:-1}} /> ;



  let userTagline = null

  if (props.userVars.userTagline || props.userVars.editTagline) {
      if (props.userVars.editTagline) {
        userTagline =
        <TextInput
          style={{height: 40, borderColor: "#0F2F47", borderWidth: 2, borderRadius: 5, padding: 5, width: 300}}
          onChangeText={(text) => taglineInput = text}
        />
      } else {
        userTagline = <View style={{marginTop: -20, height: 40, borderRadius: 10, backgroundColor: "#C53A32", width:275, justifyContent: 'center', alignItems: 'center'}}><Text adjustsFontSizeToFit numberOfLines={1} style={{paddingLeft: 50, paddingRight: 50, textAlign: 'center', fontFamily: 'fredokaone-regular', fontSize: 18, color: "#E9E2BB", lineHeight: 40}}>"{props.userVars.userTagline}"</Text></View>
      }

  } else {
    userTagline = <Text></Text> ;
  }

  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    }
  };

  const setUserImageButtonPress = (e) => {
    props.trx.getUserImage(options)
  }

  const setUserTaglineButtonPress = (e) => {
    props.trx.editTagline()
  }

  let taglineInput = ""

  const submitUserTaglineButtonPress = (e) => {
    props.trx.submitTagline(taglineInput)
    console.log("asdfasdfasdfasdfasdfasdfadsfasdfasdfasdfasdfasdfadsfadsff")
  }


  const taglineOption = props.userVars.editTagline ? <Text onPress={submitUserTaglineButtonPress} style={{textAlign: "right", fontFamily: "pacifico-regular", color:"#0F2F47", marginRight:50}}>Submit Tagline</Text> : ( props.stateVars.visitor ? <View></View> : (!props.userVars.userTagline ? <Text onPress={setUserTaglineButtonPress} style={{textAlign: "right", fontFamily: "pacifico-regular", color:"#0F2F47", marginRight:50}}>add a tagline</Text> : <Text onPress={setUserTaglineButtonPress} style={{textAlign: "right", fontFamily: "pacifico-regular", color:"#0F2F47", marginRight:50}}>edit tagline</Text> ) )

  const imagePicker = props.stateVars.visitor ? <View></View> : (<ImagePickerComponent trx={props.trx} stateVars={props.stateVars} userVars={props.userVars}/>)



  return (
    <View>
      {imagePicker}
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {userImage}
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        {userTagline}
      </View>
      {taglineOption}
    </View>

  )
}

export default Userinfo;