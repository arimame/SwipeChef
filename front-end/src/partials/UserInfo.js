import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';


function Userinfo (props) {
  console.log("------------------------ Userimage")
  console.log(props.userVars.userImage)

  let randNum = Math.round(Math.random() * 50,0)

  const userImage = props.userVars.userImage ? <Image source={{uri:`http://172.46.0.254:3000/${props.userVars.userImage}?spaghetti=${randNum}`}} style= {{width: 150, height: 150, borderColor: "black", borderWidth: 0.5}} /> : <Text>No Picture</Text> ;

  let userTagline = null

  if (props.userVars.userTagline || props.userVars.editTagline) {
      if (props.userVars.editTagline) {
        userTagline =
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => taglineInput = text}
        />
      } else {
        userTagline = <Text style={{textAlign: 'center', borderColor: "black", borderWidth: 0.5}}>{props.userVars.userTagline}</Text>
      }

  } else {
    userTagline = <Text>Enter your tagline by editing your profile</Text> ;
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

  const taglineOption = props.userVars.editTagline ? <Text onPress={submitUserTaglineButtonPress}>Submit Tagline</Text> : <Text onPress={setUserTaglineButtonPress}>Set Tagline</Text>

  return (
    <View style={{height: heightPercentageToDP('40%')}}>
      <View style={{height: heightPercentageToDP('20%'), justifyContent: 'center', alignItems: 'center'}}>
        {userImage}
        <Text onPress={setUserImageButtonPress}>Set User Image</Text>
      </View>
      <View style={{height: heightPercentageToDP('20%'), padding: 40}}>
        {userTagline}
        {taglineOption}
      </View>
    </View>

  )
}

export default Userinfo;