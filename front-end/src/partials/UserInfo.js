import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Button, TextInput} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';


function Userinfo (props) {
  console.log("------------------------ Userimage")
  console.log(props.userVars.userImage)

  let randNum = Math.round(Math.random() * 50,0)


  const userImage = props.userVars.userImage ? <Image source={{uri:`http://172.46.0.120:3000/${props.userVars.userImage}?spaghetti=${randNum}`}} style= {{width: 150, height: 150, borderColor: "#C53A32", borderRadius: 5, borderWidth: 2}} /> : <Text>No Picture</Text> ;


  let userTagline = null

  if (props.userVars.userTagline || props.userVars.editTagline) {
      if (props.userVars.editTagline) {
        userTagline =
        <TextInput
          style={{height: 40, borderColor: '"#0F2F47"', borderWidth: 2, borderRadius: 5, padding: 5}}
          onChangeText={(text) => taglineInput = text}
        />
      } else {
        userTagline = <Text style={{textAlign: 'center', backgroundColor: "#C53A32", borderRadius: 5, height: 40, fontFamily: 'fredokaone-regular', fontSize: 20, color: "#E9E2BB", lineHeight: 40}}>"{props.userVars.userTagline}"</Text>
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

  const taglineOption = props.userVars.editTagline ? <Text onPress={submitUserTaglineButtonPress} style={{fontFamily: "pacifico-regular"}}>Submit Tagline</Text> : ( props.stateVars.visitor ? <View></View> : <Text onPress={setUserTaglineButtonPress} style={{textAlign: "right", fontFamily: "pacifico-regular", color:"#0F2F47"}}>edit</Text> )

  const setImageRender = !props.userVars.imagePicker && props.stateVars.visitor ? <View></View> : <Text onPress={setUserImageButtonPress} style={{fontFamily: "pacifico-regular", color:"#0F2F47"}}>edit</Text>



  return (
    <View style={{height: heightPercentageToDP('40%')}}>
      <View style={{height: heightPercentageToDP('20%'), justifyContent: 'center', alignItems: 'center'}}>
        {userImage}
        {setImageRender}
      </View>
      <View style={{height: heightPercentageToDP('20%'), padding: 40}}>
        {userTagline}
        {taglineOption}
      </View>
    </View>

  )
}

export default Userinfo;