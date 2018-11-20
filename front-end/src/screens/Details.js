
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, FlatList} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native';

import Navbar from "../partials/Navbar";

class Details extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      recipeInfo: null
    }
  }

  componentDidMount() {
    fetch(`http://172.46.0.120:3000/recipes/${this.props.stateVars.currentRecipe}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(results => {
      const parsedResults = JSON.parse(results._bodyInit);
      this.setState({recipeInfo: parsedResults})
    })
  }

  render() {
    if (this.state.recipeInfo) {
      const ingredients = this.state.recipeInfo.ingredientLines.map((ingredient) =>
        ({key: ingredient})
      )
      //console.log(ingredients);

      const nutritionDetails = this.state.recipeInfo.nutritionEstimates;
      const ourNutrition = ["ENERC_KCAL", "FAT", "SUGAR", "PROCNT", "CHOCDF", "CHOLE", "NA", "FIBTG"]
      const ourNutritionList = nutritionDetails.filter(function(object) {
        return ourNutrition.includes(object.attribute)
      })

      console.log("list of nutr--------", ourNutritionList);





      return (
        <View style={{flex:1}}>
          <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
          <View style={{flexDirection: 'row', borderColor: "black", borderWidth: 0.5 , justifyContent: "center"}}>
            <View style={{width: widthPercentageToDP('25%'), height: heightPercentageToDP('12%'), borderColor: "black", borderWidth: 0.5}}>
              <Image
                source={{uri: this.state.recipeInfo.images[0].hostedLargeUrl}}
                style= {{width:90, height: 90}}
              />
            </View>
            <View style={{width: widthPercentageToDP('75%'), flexDirection: 'column', borderColor: "black", borderWidth: 0.5}}>
              <View style={{height: heightPercentageToDP('8%'), borderColor: "black", borderWidth: 0.5}} >
                <Text>{this.state.recipeInfo.name}</Text>
              </View>
              <View style={{height: heightPercentageToDP('4%'), borderColor: "black", borderWidth: 0.5, flexDirection: 'row'}}>
                <View style={{width: widthPercentageToDP('37.5%'), borderColor: "black", borderWidth: 0.5}}><Text>{this.state.recipeInfo.rating}</Text></View>
                <View style={{width: widthPercentageToDP('37.5%'), borderColor: "black", borderWidth: 0.5}}><Text>{this.state.recipeInfo.totalTime}</Text></View>
              </View>
            </View>
          </View>
          <View style={{height: heightPercentageToDP('4%'), flexDirection: 'row', borderColor: "black", borderWidth: 0.5}}>
            <Text>{this.state.recipeInfo.numberOfServings}</Text>
          </View>
          <View style={{flexDirection: 'row', borderColor: "black", borderWidth: 0.5}}>
            <FlatList
              data={ingredients}
              renderItem={({item}) => <Text>- {item.key}</Text>}
            />
          </View>
            <View>
              <Text>Nutrition</Text>
              <Text>Calories: {ourNutritionList[5].value}</Text>
              <Text>Sugar: {ourNutritionList[0].value} grams</Text>
              <Text>Protien: {ourNutritionList[2].value} grams</Text>
              <Text>Fiber: {ourNutritionList[1].value} grams</Text>
              <Text>Cholesterol: {ourNutritionList[4].value} grams</Text>
              <Text>Fat: {ourNutritionList[6].value} grams</Text>
              <Text>Sodium: {ourNutritionList[7].value} grams</Text>
            </View>
        </View>
      )
    } else {
      return (
        <View style={{flex:1}}>
          <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
        </View>
      )
    }
  }
}


export default Details;