import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Button} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';

function Userinfo (props) {

  const userImage = props.userVars.userImage ? <Image source={{uri: props.userVars.userImage}} style= {{width: 150, height: 150, borderColor: "black", borderWidth: 0.5}} /> : <Text>No Picture</Text> ;

  const userTagline = props.userVars.userTagline ? <Text style={{textAlign: 'center', borderColor: "black", borderWidth: 0.5}}>{props.userVars.userTagline}</Text> : <Text>Enter your tagline by editing your profile</Text> ;


  return (
    <View style={{height: heightPercentageToDP('30%')}}>
      <View style={{height: heightPercentageToDP('20%'), justifyContent: 'center', alignItems: 'center'}}>
        {userImage}
      </View>
      <View style={{height: heightPercentageToDP('10%')}}>
        {userTagline}
      </View>
    </View>

  )
}

export default Userinfo;