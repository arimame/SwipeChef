import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, TouchableHighlight, ScrollView, TouchableOpacity} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



function Listitem (props) {

  console.log("------------------Listitem view")
  const msNow = Date.now();
  const msDiff = msNow - Date.parse(props.recipe.created_at);
  const expireDays = Math.ceil((864000000 - msDiff) / 86400000);
  const expireDaysRender = props.stateVars.currentScreen === "fridge" ? <Text style={styles.expire}>Expires in: {expireDays} days</Text> : <Text></Text>

  console.log("-------BUTTON--------", props.recipe)


  addToButtonPress = (e) => {
    if (props.stateVars.currentScreen === "fridge") {
      props.trx.addToBook(props.recipe.id)
    } else {
      props.trx.addToFridge(props.recipe.id)
    }
  }

  deleteButtonPress = (e) => {
    props.trx.removeItem(props.recipe.id)
  }

  detailsButtonPress = (e) => {
    props.trx.updateCurrentRecipe(props.recipe.api_ref, props.stateVars.currentScreen)
  }

  listButtonPress = (e) => {
    props.trx.addToList(props.recipe.api_ref)
  }

  console.log("------------------------------- props ----- currentScreen")
  console.log(props.stateVars.currentScreen)

  addToText = props.stateVars.currentScreen === "fridge" ? <Icon name="book-open-variant" style={{fontSize: 30, textAlign: "center", color:"#E88532"}}  /> : (props.stateVars.currentScreen === "book" && props.stateVars.visitor ? <Icon name="fridge" style={{fontSize: 30, textAlign: "center", color:"#E88532"}}  /> : <Text></Text>)

  deleteText = props.stateVars.visitor? <Text></Text> : <Icon name="trash-can" onPress={deleteButtonPress} style={{fontSize: 30, textAlign: "center", color:"#E88532"}}/>

    return (
      <View style={styles.list_container}>
        <View style={{width: widthPercentageToDP('25%'), height: heightPercentageToDP('13%')}}>
        <TouchableHighlight onPress={this.detailsButtonPress}>
          <Image
            source={{uri: props.recipe.image}}
            style= {{width: widthPercentageToDP('25%'), height: heightPercentageToDP('13%'), borderRadius: 5}}
          />
        </TouchableHighlight>
        </View>
        <View style={styles.list_info_container}>
          <View style={styles.recipe_name_container} >
            <Text adjustsFontSizeToFit
              numberOfLines={1} style={styles.recipe_name}>{props.recipe.name}</Text>
          </View>
          <View style={styles.expire_container}>
            {expireDaysRender}
          </View>
          <View style={styles.button_container}>
            <View style={styles.delete_button}>{deleteText}</View>
            <View style={styles.list_button}>
              <TouchableOpacity onPress={listButtonPress}>
                <Icon name="playlist-edit" style={{fontSize: 30, textAlign: "center", color:"#E88532"}}/>
              </TouchableOpacity>
            </View>
            <View style={styles.add_button}><TouchableOpacity onPress={addToButtonPress}>{addToText}</TouchableOpacity></View>
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
  recipe_name_container: {
   height: heightPercentageToDP('4%'),
   backgroundColor: '#F3C05F',
   margin: 0
  },
  recipe_name: {
    textAlign: 'center',
    fontFamily: "pacifico-regular",
    color: "#0F2F47",
    lineHeight: 30
},
  expire_container: {
    height: heightPercentageToDP('3%')
  },
  expire: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 20,
    color: "#C53A32"
  },
  button_container: {
    height: heightPercentageToDP('5%'),
    flexDirection: 'row'
  },

  delete_button: {
    width: widthPercentageToDP('23.33'),
    textAlign: "center"

  },
  add_button: {
    width: widthPercentageToDP('23.33')
  },
  list_button: {
    width: widthPercentageToDP('23.33')
  }
});


export default Listitem;