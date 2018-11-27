
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, FlatList, Linking, ScrollView, WebView} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


import Navbar from "../partials/Navbar";

class Details extends React.Component  {

  constructor(props) {
    super(props);
    this.state = {
      recipeInfo: null
    }
  }

  componentDidMount() {
    fetch(`http://172.46.0.254:3000/recipes/${this.props.stateVars.currentRecipe}`, {

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

    if (this.props.stateVars.webView) {
      return (
        <View style={{flex:1}}>

        <Navbar stateVars={this.props.stateVars} style={styles.navabar} trx={this.props.trx} />
        <WebView
          source={{uri: this.state.recipeInfo.source.sourceRecipeUrl}}
        />
        </View>
      )
    }

    else if (this.state.recipeInfo) {
      const ingredients = this.state.recipeInfo.ingredientLines.map((ingredient, index) =>
        ({key: index.toString(), name: ingredient})
      )
      //console.log(ingredients);

      const nutritionDetails = this.state.recipeInfo.nutritionEstimates;
      const ourNutrition = ["ENERC_KCAL", "FAT", "SUGAR", "PROCNT", "CHOCDF", "CHOLE", "NA", "FIBTG"]
      const ourNutritionList = nutritionDetails.filter(function(object) {
        return ourNutrition.includes(object.attribute)
      })

      const ourNutritionListRender= ourNutritionList.map((object, index) =>
          <Text style={styles.nutrition_item} key={index}>{object.description} : {object.value} {object.unit.name}s</Text>
        );

    const getRating = () => {
      const ratingN = this.state.recipeInfo.rating
      console.log(ratingN)
      let ratingS = ""
      for (var i = 0; i < ratingN; i++) {
        ratingS += "⭐"
      }
      return ratingS
    }

    const recipeRating = getRating();

      console.log("list of nutr--------", ourNutritionList);


      return (
        <View style={{flex:1}}>
          <Navbar stateVars={this.props.stateVars} style={styles.navabar} trx={this.props.trx} />
          <ScrollView>
          <View style={styles.details_container}>
            <View style={styles.image_container}>
              <Image
                source={{uri: this.state.recipeInfo.images[0].hostedLargeUrl}}
                style= {{width:widthPercentageToDP('25%'), height: heightPercentageToDP('12%'), borderRadius: 5}}
              />
            </View>
            <View style={styles.info_container}>
              <View style={styles.name_container} >
                <Text adjustsFontSizeToFit
              numberOfLines={1} style={styles.recipe_name}>{this.state.recipeInfo.name}</Text>
              </View>
              <View style={styles.rating_time_container}>
                <View style={styles.rating_time}><Text style={styles.rating_time}>Rating: {recipeRating}</Text></View>
                <View style={styles.rating_time}><Text style={styles.rating_time}>⏲: {this.state.recipeInfo.totalTime}</Text></View>
              </View>
            </View>
          </View>

           <View style={styles.ingredients_title_container}>
            <Text style={styles.ingredients_title}>Ingredients</Text>
          </View>
          <View style={styles.ingredients_container}>
            <FlatList
              data={ingredients}
              renderItem={({item}) => <Text>• {item.name}</Text>}
              style={{margin: 10}}
            />
          </View>
           <View style={styles.serving_container}>
            <Text style={styles.serving}>*This recipe serves {this.state.recipeInfo.numberOfServings} people</Text>
          </View>
          <View style={styles.nutrition_container}>
            <Text style={styles.nutrition_title}>Nutrition</Text>
            {ourNutritionListRender}
          </View>
          <View style={{flexDirection: "row", justifyContent:"center", alignItems:"center", marginTop:10, marginBottom: 50}}>
            <Button
              // onPress={() => Linking.openURL(this.state.recipeInfo.source.sourceRecipeUrl)}
              onPress={this.props.trx.toggleWebView}
              title="View Recipe"
              color="#0F2F47"
            />
            <Icon name='open-in-new' style={{color: "#0F2F47", fontSize:20}} />
          </View>
          </ScrollView>
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

const styles = StyleSheet.create({
  navabar: {
   height: heightPercentageToDP('10%')
  },
  details_container: {
    flexDirection: 'row',
    justifyContent: "center",
    marginTop: 5
  },
  image_container: {
    width: widthPercentageToDP('25%'),
    height: heightPercentageToDP('12%'),
    marginLeft: 5,
    marginRight: 5
  },

  info_container: {
    width: widthPercentageToDP('70%'),
    flexDirection: 'column',
    borderColor: '#0F2F47',
    borderWidth: 1,
    marginRight: 5,
    borderRadius: 5

  },

  name_container: {
    height: heightPercentageToDP('8%'),
    backgroundColor: '#C53A32',
    margin: 0,
  },

  recipe_name: {
    textAlign: 'center',
    fontFamily: "pacifico-regular",
    color: "#E9E2BB",
    lineHeight: 50
  },
  rating_time_container: {
    height: heightPercentageToDP('4%'),
    flexDirection: 'row'
  },
  rating_time: {
    textAlign: "center",
    width: widthPercentageToDP('37.5%'),
    fontFamily: "arimo-regular",

  },

  serving_container: {
    height: heightPercentageToDP('4%'),
    flexDirection: 'row',
    textAlign: "center",
    margin: 5
  },

  serving: {
   fontFamily: "pacifico-regular",
   color: '#C53A32'
  },

  ingredients_container: {
    flexDirection: 'row',
  },
  ingredients_title_container: {
    marginTop: 5
  },
  ingredients_title: {
    fontFamily: "pacifico-regular",
    textAlign: "center",
    fontSize: 20,
    color:"#0F2F47"

  },

  nutrition_title: {
    fontFamily: "pacifico-regular",
    textAlign: "center",
    fontSize: 20,
    color:"#E88532"

  },

  nutrition_container: {
    margin: 10,
    borderColor: "#E88532",
    borderWidth: 2,
    borderRadius: 5
  },

  nutrition_item: {
    textAlign: "center"
  }

});


export default Details;