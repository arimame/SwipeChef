import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';



function FriendListitem(props) {

  selectFriend = (e) => {
    props.trx.startVisiting(props.friend.username)
  }


  return (
    <View>
      <View style={{flexDirection: 'row', borderColor: "black", borderWidth: 0.5 , justifyContent: "center", marginBottom: 10}}>
        <View style={{width: widthPercentageToDP('25%'), height: heightPercentageToDP('12%'), borderColor: "black", borderWidth: 0.5}}>
          <TouchableHighlight onPress={selectFriend} >
          <Image
            source={{uri: `http://172.46.0.254:3000/${props.friend.photo}`}}
            style= {{width:90, height: 90}}
          />
          </TouchableHighlight>
        </View>
        <View style={{width: widthPercentageToDP('70%'), flexDirection: 'column', borderColor: "black", borderWidth: 0.5}}>
          <View style={{height: heightPercentageToDP('6%'), borderColor: "black", borderWidth: 0.5}} >
            <Text>{props.friend.username}</Text>
          </View>
          <View style={{height: heightPercentageToDP('6%'), borderColor: "black", borderWidth: 0.5}}>
            <Text>{props.friend.tagline}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default FriendListitem;