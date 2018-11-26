import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';



function FriendListitem(props) {

  selectFriend = (e) => {
    props.trx.startVisiting(props.friend.username)
  }


  return (
    <View>
      <View style={styles.list_container}>
        <View style={{width: widthPercentageToDP('25%'), height: heightPercentageToDP('13%')}}>
          <TouchableHighlight onPress={selectFriend} >
          <Image
            source={{uri: `http://172.46.0.120:3000/${props.friend.photo}`}}
            style= {{width: widthPercentageToDP('25%'), height: heightPercentageToDP('13%'), borderRadius: 5}}
          />
          </TouchableHighlight>
        </View>
        <View style={styles.list_info_container}>
          <View style={styles.chef_name_container}>
            <Text style={styles.chef_name}>{props.friend.username}</Text>
          </View>
          <View style={styles.tagline_container}>
            <Text style={styles.tagline}>"{props.friend.tagline}"</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  list_container: {
    flexDirection: 'row',

    marginRight: 2,
    marginLeft: 2,
    justifyContent: "center",
    marginBottom: 10,
    paddingRight: 0,

  },

  list_info_container: {
    width: widthPercentageToDP('70%'),
    flexDirection: 'column',
    margin: 0,
    marginLeft: 2,
     borderColor: '#0F2F47',
    borderWidth: 2,
    borderRadius: 5,

  },
  chef_name_container: {
   height: heightPercentageToDP('6%'),
   backgroundColor: "#C53A32",
   margin: 0,

  },
  chef_name: {
    textAlign: 'center',
    fontFamily: "pacifico-regular",
    color:"#E9E2BB",
    fontSize: 25,

},
  tagline_container: {
    height: heightPercentageToDP('6%'),
    padding: 10
  },
  tagline: {
    textAlign: "center",
    lineHeight: 30
  }
});


export default FriendListitem;